
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
    gamesData: null,
    shoutOutData: null
  }),
  getters: {
    getLeagueData: (state) => state.leagueData,
    getGamesData: (state) => state.gamesData,
    getUser: (state) => state.user,

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
      payload = payload.sort((a, b) => new Date(b.date) - new Date(a.date));
      this.gamesData = payload;
    },
    setShoutOutData(payload) {
      this.shoutOutData = payload;
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
    getShoutOutsByLeagueId(id) {
      let holder = []
      this.shoutOutData.map((each) => {
        if (each.leagueid == id) {
          holder.push(each);
        }
      });
      return holder.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    getRanksByLeagueId(id) {
      let playersSumScore = {}

      //---------Get All Game data of League and sum-up points by player id--------

      let gameDataholder = []
      //get all games by League ID
      this.gamesData.map((each) => {
        if (each.leagueid == id) {
          gameDataholder.push(each);
        }
      });

      //loop in each game
      gameDataholder.map((each) => {
        //loop in each player
        each.participants.map((eachPlayer) => {
          if (playersSumScore[eachPlayer.id]) {
            playersSumScore[eachPlayer.id].score = playersSumScore[eachPlayer.id].score + eachPlayer.score;
          } else {
            playersSumScore[eachPlayer.id] = { name: eachPlayer.name, score: eachPlayer.score }
          }
        });
      });

      //----------Get all Shout out data of League and sum-up by player id

      let shoutsDataholder = []
      //get all shoutout by League ID
      this.shoutOutData.map((each) => {
        if (each.leagueid == id) {
          shoutsDataholder.push(each);
        }
      });

      //loop in each shout out
      shoutsDataholder.map((each) => {
        if (playersSumScore[each.player.id]) {
          playersSumScore[each.player.id].score = playersSumScore[each.player.id].score + each.score;
        } else {
          playersSumScore[each.player.id] = { name: each.player.name, score: each.score }
        }
      });

      // ------------- sort by score and return
      return Object.entries(playersSumScore).sort((a, b) => b[1].score - a[1].score)
    }
  },
})
