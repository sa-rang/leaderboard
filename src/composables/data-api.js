
import { ref } from "vue"
import { collection, doc, addDoc, getDocs, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useGlobalStore } from '@/stores/global'

export function useDataApi() {

    const playersDB = collection(db, "players");
    const leaguesDB = collection(db, "leagues");
    const gamesDB = collection(db, "games");
    const ShOutTypeDB = collection(db, "shoutouttypes");
    const ShOutDB = collection(db, "shoutouts");

    const playersList = ref(null);
    const leaguesList = ref(null);
    const shoutOutTypeList = ref(null);

    const store = useGlobalStore();
    const userDetails = store.getUser;


    //-----------------Player------------------------
    //get all players real-time
    const loadPlayers = async () => {
        await onSnapshot(playersDB, (querySnapshot) => {
            let players = [];

            querySnapshot.forEach((doc) => {
                const player = {
                    id: doc.id,
                    name: doc.data().name,
                    email: doc.data().email,
                    active: doc.data().active
                }
                players.push(player)

            });
            playersList.value = players.sort((a, b) => a.name > b.name ? 1 : -1)

        });
    }
    const savePlayer = async (iData) => {
        let payload = JSON.parse(JSON.stringify(iData));
        payload['creator'] = userDetails.email;
        await addDoc(playersDB, payload);
    }

    const updatePlayer = async (iData, id) => {
        let payload = JSON.parse(JSON.stringify(iData));
        payload['creator'] = userDetails.email;
        const playerRef = doc(db, "players", id);
        await updateDoc(playerRef, payload);

    }

    const loadLeagues = async () => {
        // get all leagues
        const querySnapshot = await getDocs(leaguesDB);
        let leagues = [];
        querySnapshot.forEach((doc) => {
            const league = {
                id: doc.id,
                name: doc.data().name,
                active: doc.data().active
            }
            leagues.push(league)
        });
        leaguesList.value = leagues
        store.setLeagueData(leagues)
    }


    //--------------------Games--------------------------
    //get all games data across league real-time
    const loadAllGameData = async () => {
        onSnapshot(gamesDB, (querySnapshot) => {
            let games = [];
            querySnapshot.forEach((doc) => {
                const game = {
                    id: doc.id,
                    name: doc.data().name,
                    date: doc.data().date,
                    leaguename: doc.data().leaguename,
                    leagueid: doc.data().leagueid,
                    participants: doc.data().participants
                }
                games.push(game)
            });
            store.setGamesData(games)
        });
    }
    const saveGameScore = async (iData) => {
        let payload = JSON.parse(JSON.stringify(iData));
        let leagueData = payload.league.split("__");

        const docRef = addDoc(gamesDB, {
            name: payload.name,
            date: payload.date,
            leagueid: leagueData[0],
            leaguename: leagueData[1],
            participants: payload.participants,
            creator: userDetails.email
        });
    }

    const updateGameData = async (iData, id) => {
        let payload = JSON.parse(JSON.stringify(iData));
        let leagueData = payload.league.split("__");
        const docRef = doc(db, "games", id);
        await updateDoc(docRef, {
            name: payload.name,
            date: payload.date,
            leagueid: leagueData[0],
            leaguename: leagueData[1],
            participants: payload.participants,
            creator: userDetails.email
        });

    }

    const deleteGameData = async (id) => {
        const docRef = doc(db, "games", id);
        await deleteDoc(docRef);
    }

    //-----------------Shout-out------------------------
    // get all shout out types
    const loadShoutOutTypes = async () => {
        console.log("ok")
        const querySnapshot = await getDocs(ShOutTypeDB);
        let holder = [];
        querySnapshot.forEach((doc) => {
            const holderObj = {
                id: doc.id,
                name: doc.data().name,
                code: doc.data().code,
                active: doc.data().active
            }
            holder.push(holderObj)
        });
        shoutOutTypeList.value = holder
    }

    const saveShoutOut = async (iData) => {
        let payload = JSON.parse(JSON.stringify(iData));
        let leagueData = payload.league.split("__");
        let shoutData = payload.shoutout.split("__");

        const docRef = addDoc(ShOutDB, {
            desc: payload.desc,
            date: payload.date,
            leagueid: leagueData[0],
            leaguename: leagueData[1],
            player: payload.player,
            score: payload.score,
            shoutoutid: shoutData[0],
            shoutoutname: shoutData[1],
            shoutoutcode: shoutData[2],
            creator: userDetails.email
        });
    }

    const updateShoutoutData = async (iData, id) => {
        let payload = JSON.parse(JSON.stringify(iData));
        let leagueData = payload.league.split("__");
        let shoutData = payload.shoutout.split("__");
        const docRef = doc(db, "shoutouts", id);
        await updateDoc(docRef, {
            desc: payload.desc,
            date: payload.date,
            leagueid: leagueData[0],
            leaguename: leagueData[1],
            player: payload.player,
            score: payload.score,
            shoutoutid: shoutData[0],
            shoutoutname: shoutData[1],
            shoutoutcode: shoutData[2],
            creator: userDetails.email
        });

    }

    const deleteShoutoutData = async (id) => {
        const docRef = doc(db, "shoutouts", id);
        await deleteDoc(docRef);
    }


    //get all Shout out data across league real-time
    const loadAllShoutOutData = async () => {
        onSnapshot(ShOutDB, (querySnapshot) => {
            let shoutOuts = [];
            querySnapshot.forEach((doc) => {
                const holderObj = {
                    id: doc.id,
                    desc: doc.data().desc,
                    date: doc.data().date,
                    leaguename: doc.data().leaguename,
                    leagueid: doc.data().leagueid,
                    player: doc.data().player,
                    score: doc.data().score,
                    shoutoutcode: doc.data().shoutoutcode,
                    shoutoutid: doc.data().shoutoutid,
                    shoutoutname: doc.data().shoutoutname,
                }
                shoutOuts.push(holderObj)
            });
            store.setShoutOutData(shoutOuts)
        });
    }

    return {
        playersList,
        loadPlayers,
        savePlayer,
        updatePlayer,
        leaguesList,
        loadLeagues,
        saveGameScore,
        updateGameData,
        deleteGameData,
        shoutOutTypeList,
        loadShoutOutTypes,
        saveShoutOut,
        updateShoutoutData,
        deleteShoutoutData,
        loadAllGameData,
        loadAllShoutOutData
    }
}