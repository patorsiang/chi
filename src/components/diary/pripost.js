import React, { Component } from 'react';
import $ from 'jquery';
import { withStyles } from '@material-ui/core/styles';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';
import randomColor from "randomcolor";
import { focus } from '../../store/actions/diaryAction'
import { connect } from 'react-redux'
import { changeMenu } from "../../store/actions/mapAction";
import { Link } from 'react-router-dom'

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
    const { diary, focus, changeMenu } = this.props
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
          color: color[i % color.length]
        }
      }),
      eventClick: function (event) {
        focus(event.id);
        changeMenu('/diary/edit')
      },
    });
  }

  render() {
    return (
      <Link to="/diary/edit" style={{textDecoration: 'none'}}>
        <div ref='calendar'>
        </div>
      </Link>
    );
  }

}


class PriPost extends Component {
  render() {
    const { classes, diary, focus, changeMenu, menu } = this.props
    console.log(menu);

    return (
      <div className={classes.App}>
        <Calendar
          id="your-custom-ID"
          navLinks={true} // can click day/week names to navigate views
          editable={true}
          diary={diary}
          focus={focus}
          changeMenu={changeMenu}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.map.Menu
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeMenu: Menu => dispatch(changeMenu(Menu)),
    focus: Id => dispatch(focus(Id)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PriPost));