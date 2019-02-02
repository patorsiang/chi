import React, { Component } from 'react';
import $ from 'jquery';
import { withStyles } from '@material-ui/core/styles';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';

const styles = theme => ({
  App: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: '14px'
    
  },
});
class Calendar extends Component {

  componentDidMount(){
    const { calendar } = this.refs;
    
    $(calendar).fullCalendar({
      header: {
        left: 'prevYear, prev',
        center: 'title,',
        right: 'today, next, nextYear'
      },
      events: [
        {
          title: 'All Day Event',
          start: '2019-02-05',
          color: '#FF9933'
        },
        {
          title: 'All Event',
          start: '2019-02-05',
          color: '#FFCC66'
        },
        {
          title: 'Long Event',
          start: '2019-01-01',
          color: '#FF9933'
        }
      ],
      eventClick: function(event) {
        alert('Event: ' + event.title);
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
    const { classes } = this.props
    return (
      <div className={classes.App}>
        <Calendar 
          id = "your-custom-ID"
          navLinks= {true} // can click day/week names to navigate views
          editable= {true}
        />
        
        
      </div>
    );
  }
}

export default withStyles(styles)(PriPost);