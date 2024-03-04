import * as React from "react";
import * as RN from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { horizontalScale, moderateScale, verticalScale } from "./Metrics";
class MyCalendar extends React.Component {
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  _onPress = (item, textColor) => {
    console.log("textColor in calendar component", textColor);
    if (
      this.state.highlightedDates.find(
        (date) =>
          date.getDate() === item &&
          date.getMonth() === this.state.activeDate.getMonth() &&
          date.getFullYear() === this.state.activeDate.getFullYear()
      )
    ) {
      console.log(item);
      console.log("Input --> " + this.state.highlightedDates);
      this.props.onDateSelected(
        item,
        this.state.activeDate.getMonth(),
        this.state.activeDate.getFullYear(),
        textColor
      );
    } else {
      console.log(
        "Input --> " +
          item +
          " " +
          (this.state.activeDate.getMonth() + 1) +
          " " +
          " " +
          this.state.activeDate.getFullYear()
      );
      this.props.onDateSelected(
        item,
        this.state.activeDate.getMonth(),
        this.state.activeDate.getFullYear(),
        textColor
      );
    }
    // console.log(this.state.activeDate.getMonth()); // เดือนจริงๆคือ month +1
  };

  changeMonth = (n) => {
    this.setState(
      (prevState) => {
        const newActiveDate = new Date(prevState.activeDate);
        newActiveDate.setMonth(prevState.activeDate.getMonth() + n);
        return { activeDate: newActiveDate };
      },
      () => {
        // Call generateMatrix after the state update is completed
        this.generateMatrix();
      }
    );
  };
  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  state = {
    activeDate: new Date(),
    counter: 1,
    maxDays: 0,
    matrix: [], // เพิ่ม state matrix เป็นสถานะสำหรับเก็บข้อมูล matrix
    highlightedDates: [],
  };
  componentDidMount() {
    this.generateMatrix();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.highlightedDates !== this.props.highlightedDates) {
      this.setState(
        { highlightedDates: this.props.highlightedDates || [] },
        () => {
          this.generateMatrix();
        }
      );
    }
  }

  generateMatrix() {
    const matrix = [];
    // Create header
    matrix[0] = this.weekDays;

    const year = this.state.activeDate.getFullYear();
    const month = this.state.activeDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    let maxDays = this.nDays[month];

    if (month === 1) {
      // February
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        maxDays += 1;
      }
    }

    this.setState({ maxDays }); // อัปเดตค่า maxDays ใน state

    let counter = 1;
    let rowIndex = 1;
    let prevMonthDays = this.nDays[(month - 1 + 12) % 12];
    let nextMonthDays = 1;

    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        if (row === 1 && col >= firstDay) {
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          matrix[row][col] = counter++;
        } else if (rowIndex === 1) {
          matrix[row][col] = prevMonthDays - firstDay + col + 1;
        } else {
          matrix[row][col] = nextMonthDays++;
        }
      }
      rowIndex++;
    }

    this.setState({ matrix }); // อัปเดต matrix ใน state
  }

  render() {
    const matrix = this.state.matrix;
    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const rows = matrix.map((row, rowIndex) => {
      const rowItems = row.map((item, colIndex) => {
        let textColor = "black"; // กำหนดสีเทาเป็นค่าเริ่มต้น

        if (rowIndex === 0) {
          textColor = "black"; // กำหนดสีดำสำหรับวันที่ในเดือนปัจจุบันในแถวแรก (header row)
        } else if (rowIndex === 1 && item <= 31 && item >= 24) {
          textColor = "lightgray"; // กำหนดสีเทาสำหรับวันที่ไม่ใช่ของเดือนปัจจุบันในแถวแรก
        } else if (
          (rowIndex === 5 && item < 31 && item < 20) ||
          (rowIndex === 6 && item < 31 && item < 30)
        ) {
          textColor = "lightgray"; // กำหนดสีlightgrayสำหรับวันที่ไม่ใช่ของเดือนปัจจุบันในแถวอื่นๆ
        }
        if (
          this.state.highlightedDates.find(
            (date) =>
              date.getDate() === item &&
              date.getMonth() === this.state.activeDate.getMonth() &&
              date.getFullYear() === this.state.activeDate.getFullYear()
          ) &&
          rowIndex === 1 &&
          item < 24
        ) {
          textColor = "#f00";
        } else if (
          this.state.highlightedDates.find(
            (date) =>
              date.getDate() === item &&
              date.getMonth() === this.state.activeDate.getMonth() &&
              date.getFullYear() === this.state.activeDate.getFullYear()
          ) &&
          rowIndex >= 2 &&
          rowIndex <= 5 &&
          // item > 24
          item > 3 &&
          item <= 31
        ) {
          textColor = "#f00";
        } else if (
          this.state.highlightedDates.find(
            (date) =>
              date.getDate() === item &&
              date.getMonth() === this.state.activeDate.getMonth() &&
              date.getFullYear() === this.state.activeDate.getFullYear()
          ) &&
          rowIndex === 6 &&
          item <= 31 &&
          item > 24
        ) {
          // textColor = 'blue'
          textColor = "#f00";
        }

        if (
          item === currentDate &&
          currentMonth === this.state.activeDate.getMonth() &&
          currentYear === this.state.activeDate.getFullYear()
        ) {
          // textColor = "blue"; // กำหนดสีแดงสำหรับวันที่ปัจจุบันที่ตรงกันทั้งวันเดือนปี
        }
        return (
          <RN.Text
            key={`${rowIndex}-${colIndex}`}
            style={{
              flex: 1,
              height: verticalScale(17),
              // height: 18,
              textAlign: "center",
              color: textColor,
              fontWeight: rowIndex === 0 ? "bold" : "normal",
            }}
            onPress={() => this._onPress(item, textColor)}
          >
            {item !== -1 ? item : ""}
          </RN.Text>
        );
      });

      return (
        <RN.View
          key={rowIndex}
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {rowItems}
        </RN.View>
      );
    });

    return (
      <RN.View>
        <RN.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: verticalScale(53),
            // marginBottom: "15%",
          }}
        >
          <RN.Text
            style={{
              fontWeight: "bold",
              fontSize: moderateScale(17.7),
              // fontSize: 18,
              textAlign: "left",
              marginLeft: "8%",
            }}
          >
            {this.months[this.state.activeDate.getMonth()]} &nbsp;
            {this.state.activeDate.getFullYear()}
          </RN.Text>
          <RN.View
            style={{
              position: "absolute",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "75%",
            }}
          >
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color="black"
              style={{}}
              onPress={() => this.changeMonth(-1)}
            />
            <RN.Text>{"   "}</RN.Text>
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color="black"
              style={{
                transform: [{ rotateY: "180deg" }],
              }}
              onPress={() => this.changeMonth(+1)}
            />
          </RN.View>
        </RN.View>
        {rows}
      </RN.View>
    );
  }
}

// Export for now to get rid of error and see preview:
export default MyCalendar;
