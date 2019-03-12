import React, { Component } from 'react';
import $ from 'jquery';
import { withStyles } from '@material-ui/core/styles';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';
import randomColor from "randomcolor";
import { connect } from "react-redux";
import { focusADiary, loadPost } from "../../store/actions/appAction";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  App: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize: '14px',
    zIndex: 0,
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
      }),
      page: '/diary'
    }
  }

  componentDidUpdate() {
    // const { calendar,calendar1 } = this.refs;
    const { calendar } = this.refs;
    const { diary, focusADiary, loadPost } = this.props
    const { color } = this.state
    const func = this
    // $(calendar1).fullCalendar({
    // header: {
    //   left: 'prevYear, prev',
    //  center: 'title,',
    //  right: 'today, next, nextYear'
    // },
    // });
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
        focusADiary(event.id)
        loadPost()
        func.setState({
          page: '/diary/edit'
        })
      },
    });
  }

  renderRedirect = () => {
    if (this.state.page.includes('/diary/edit')) {
      return <Redirect to={this.state.page} />
    }
  }

  render() {
    return (
      <div ref='calendar'>
        {this.renderRedirect()}
      </div>
      // <div ref='calendar1'> 
      //</div> <Link to="/diary/edit" style={{textDecoration: 'none'}}>
      //  <div ref='calendar'>
      //  </div>
      // </Link>
    );
  }

}

class PriPost extends Component {
  render() {
    const { classes, diary, focusADiary, loadPost } = this.props
    
    return (
      <div className={classes.App}>
        <Calendar
          id="your-custom-ID"
          navLinks={true} // can click day/week names to navigate views
          editable={true}
          diary={diary}
          focusADiary={focusADiary}
          loadPost={loadPost}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    focusADiary: (id) => dispatch(focusADiary(id)),
    loadPost: () => dispatch(loadPost())
  }
}

export default withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(PriPost));