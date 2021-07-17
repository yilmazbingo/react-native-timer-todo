import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Focus } from "./src/features/focus/Focus";
import { FocusHistory } from "./src/features/focus/FocusHistory";
import { Timer } from "./src/features/timer/Timer";
import { colors } from "./src/utils/colors";
import { spacing } from "./src/utils/sizes";

// if the task it is comleted or failed
const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        // take the half space of the rest of available space
        <View style={{ flex: 1 }}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});

// import React, { useEffect, useState, useRef } from "react";
// import { Button, StyleSheet, Text, View } from "react-native";
// export default function App() {
//   const [playMode, setPlayMode] = useState(false);
//   const [millis, setMillis] = useState(5000);
//   // 20:00 formatTimewill adjust :kk part
//   const formatTime = (time) => (time < 10 ? `0${time}` : time);

//   const countDown = () => {
//     setMillis((time) => {
//       if (time === 0) {
//         clearInterval(myInterval.current);
//         return time;
//       }
//       // we are counting down every second
//       const timeLeft = time - 1000;
//       return timeLeft;
//     });
//   };

//   const myInterval = useRef(null);

//   useEffect(() => {
//     if (playMode) {
//       myInterval.current = setInterval(() => {
//         countDown();
//         console.log("countdown");
//         return () => {
//           clearInterval(myInterval.current);
//         };
//       }, 1000);
//     }
//     myInterval.current = setInterval(countDown, 1000);

//     // setPlayMode(false);
//     // setMillis(5000);
//   }, []);

//   const minute = Math.floor(millis / 1000 / 60) % 60;
//   const seconds = Math.floor(millis / 1000) % 60;

//   const startTimerHandler = () => {
//     setPlayMode(true);
//     // setMillis(5000);
//   };

//   return (
//     <View style={styles.container}>
//       <Text>
//         {" "}
//         {formatTime(minute)}:{formatTime(seconds)}
//       </Text>
//       <Button onPress={startTimerHandler} title="Start" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
