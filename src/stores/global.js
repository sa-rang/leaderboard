
import { defineStore } from 'pinia'
import router from '../router'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    user: null,
    leagueData: null,
    gamesData: null
  }),
  getters: {
    getLeagueData: (state) => state.leagueData,
    getGamesData: (state) => state.gamesData,

  },
  actions: {
    async login(details) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert("User not found")
            break
          case 'auth/wrong-password':
            alert("Wrong password")
            break
          default:
            alert("Something went wrong")
        }

        return
      }
      this.user = auth.currentUser;

      router.push('/')
    },

    async register(details) {
      const { email, password } = details

      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert("Email already in use")
            break
          case 'auth/invalid-email':
            alert("Invalid email")
            break
          case 'auth/operation-not-allowed':
            alert("Operation not allowed")
            break
          case 'auth/weak-password':
            alert("Weak password")
            break
          default:
            alert("Something went wrong")
        }

        return
      }

      this.user = auth.currentUser;

      router.push('/')
    },
    async logout() {
      await signOut(auth)

      this.user = null;

      router.push('/login')
    },
    fetchUser() {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          this.user = null;
        } else {
          this.user = user;

          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    },
    setLeagueData(payload) {
      this.leagueData = payload;
    },
    setGamesData(payload) {
      this.gamesData = payload;
    },
    getGamesByLeagueId(id) {
      let holder = []
      this.gamesData.map((each) => {
        if (each.leagueid == id) {
          holder.push(each);
        }
      });
      return holder.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    getRanksByLeagueId(id) {
      let holder = []
      //getall games by League ID
      this.gamesData.map((each) => {
        if (each.leagueid == id) {
          holder.push(each);
        }
      });
      let playersSumScore = {}
      //loop in each game
      holder.map((each) => {
        //loop in each player
        each.participants.map((eachPlayer) => {
          if (playersSumScore[eachPlayer.id]) {
            playersSumScore[eachPlayer.id].score = playersSumScore[eachPlayer.id].score + eachPlayer.score;
          } else {
            playersSumScore[eachPlayer.id] = { name: eachPlayer.name, score: eachPlayer.score }
          }
        });
      });

      // sort by score and return
      return Object.entries(playersSumScore).sort((a, b) => b[1].score - a[1].score)

    }
  },
})
