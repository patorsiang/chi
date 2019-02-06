import React, { Component } from 'react';
import $ from 'jquery';
import { withStyles } from '@material-ui/core/styles';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';
import randomColor from "randomcolor";
const styles = theme => ({
  App: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: '14px'

  },
});
class Calendar extends Component {

  constructor(props) {
    super(props)
    //change color in this point
    this.state = {
      color: randomColor({
        count: 7,
        hue: 'orange'
      })
    }
  }

  componentDidUpdate() {
    const { calendar } = this.refs;
    const { diary } = this.props
    const { color } = this.state

    $(calendar).fullCalendar({
      header: {
        left: 'prevYear, prev',
        center: 'title,',
        right: 'today, next, nextYear'
      },
      events: diary.map((data, i) => {
        return {
          title: data.data.title,
          id: data.id,
          start: new Date(data.data.date).toLocaleDateString(),
          color: color[i%color.length]
        }
      }),
      eventClick: function (event) {
        console.log(event.id);
      },
    });
  }

  render() {
    return (
      <div ref='calendar'></div>
    );
  }

}


class PriPost extends Component {
  render() {
    const { classes, diary } = this.props
    return (
      <div className={classes.App}>
        <Calendar
          id="your-custom-ID"
          navLinks={true} // can click day/week names to navigate views
          editable={true}
          diary={diary}
        />
      </div>
    );
  }
}

export default withStyles(styles)(PriPost);