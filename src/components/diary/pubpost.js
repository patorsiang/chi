import React, { Component, Fragment } from 'react'
import { Grid, Card, CardHeader, CardContent, CardActions, IconButton, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core'
import Location from '@material-ui/icons/LocationOn';
import BookmarkIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookedIcon from '@material-ui/icons/Bookmark';
import FavIcon from '@material-ui/icons/FavoriteBorderOutlined';
import LoveIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import ReportIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';
import Avatar from 'react-avatar'
import { like, book, report } from '../../store/actions/appAction'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '10%'
  },
  img: {
    margin: 'center',
    display: 'block',
  },
  card: {
    marginTop: '5px',
    maxWidth: 400,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  safe: {
    borderColor: '#33CC33',
    backgroundColor: '#33CC33',
    border: '1.5px solid',
    fontSize: 12,
    float: 'right'
    // marginLeft: theme.spacing.unit * 11,
  },
  maybe: {
    borderColor: '#FFCC00',
    backgroundColor: '#FFCC00',
    border: '1.5px solid',
    fontSize: 12,
    float: 'right'
  },
  bad: {
    borderColor: '#FF0000',
    backgroundColor: '#FF0000',
    border: '1.5px solid',
    fontSize: 12,
    float: 'right'
  },
  chip: {
    margin: theme.spacing.unit,
    fontSize: 12,
  },
});

class PubPost extends Component {
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      open: false,
      book: this.props.post.data.book.includes(this.props.auth.uid),
      like: this.props.post.data.like.includes(this.props.auth.uid),
      report: false,
    }
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.post.data.photo.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.post.data.photo.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  like(id) {
    if (window.navigator.onLine) {
      this.setState({
        like: !this.state.like
      })

      this.props.like(id)
    }
  }

  book(id) {
    if (window.navigator.onLine) {
      this.setState({
        book: !this.state.book
      })
      this.props.book(id)
    }
  }

  report(id) {
    if (window.navigator.onLine) {
      this.props.report(id)
      this.setState({ open: false, report: true });
    }
  };

  render() {
    const { activeIndex } = this.state;
    const { classes, sz, post, auth, no, profile } = this.props
    const { book, like, report } = this.state

    const slides = post.data.photo.map((item, i) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={i}
        >
          <img src={item} key={i} alt={item} style={{ width: '100%' }} />
        </CarouselItem>
      );
    });
    return (
      <Fragment>
        {!report ?
          <Grid item xs={sz} className={classes.root} key={no}>
            <Card key={no} className={classes.card} >
              <CardHeader
                avatar={
                  <Fragment>
                    <Avatar name={post.data.writer.displayName} size="45" src={post.data.writer.Photo} round={true} />
                  </Fragment>
                }
                action={
                  auth.uid ? <IconButton>
                    <ReportIcon onClick={this.handleClickOpen} />
                  </IconButton> : null
                }
                title={post.data.title}
                subheader={post.data.date}
              />
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"This content is inappropriate or incorrect?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Do you want to {profile.admin ? <em>"Delete"</em> : <em>"Report"</em>} it?
            </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
            </Button>
                  <Button onClick={() => this.report(post.id)} color="primary" autoFocus>
                    {profile.admin ? "Delete" : "Report"}
                  </Button>
                </DialogActions>
              </Dialog>
              <Carousel key={no} activeIndex={activeIndex} next={this.next} previous={this.previous}>
                <CarouselIndicators key={no} items={post.data.photo} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
              </Carousel>
              <CardActions className={classes.actions} disableActionSpacing>
                {auth.uid ?
                  <Fragment>
                    <IconButton onClick={() => { this.like(post.id) }}>
                      {like ? <LoveIcon color="secondary" /> : <FavIcon color="secondary" />}
                    </IconButton>
                    <IconButton onClick={() => { this.book(post.id) }}>
                      {book ? <BookedIcon color="secondary" /> : <BookmarkIcon color="disabled" />}
                    </IconButton>
                  </Fragment> : null}

                {post.data.safe ? post.data.safe === "safe" ?
                  <Chip
                    icon={<FaceIcon />}
                    label="Social Optimum"
                    className={classes.safe}
                    color="primary"
                  /> : post.data.safe === "bad" ?
                    <Chip
                      icon={<FaceIcon />}
                      label="Social Optimum"
                      className={classes.bad}
                      color="primary"
                    /> : <Chip
                      icon={<FaceIcon />}
                      label="Social Optimum"
                      className={classes.maybe}
                      color="primary"
                    /> : null}

              </CardActions>
              <CardContent>
                <Typography component="p" align="left">{post.data.note}</Typography>
                <Typography variant="caption" align="right">  <Location /> {post.data.state} </Typography>
                <Typography variant="caption" align="right">  {[...new Set(post.data.tag)].map(tag => ' #' + tag)} </Typography>
                {/* {post.data.theme ? post.data.theme.length === 0 ? <Chip label="OTHER" className={classes.chip} align="left" /> : post.data.theme.map((theme, i) => theme === "ORGANIZATION" ? <Chip key={i} label="WORLD_HERITAGE" className={classes.chip} align="left" /> : <Chip key={i} label={theme} className={classes.chip} align="left" />) : <Chip label="OTHER" className={classes.chip} align="left" />} */}
                {post.data.theme ?
                  post.data.theme.includes(',') ?
                    post.data.theme.split(',').map(th => <Chip label={th} className={classes.chip} align="left" />)
                    : <Chip label={post.data.theme} className={classes.chip} align="left" />
                  : <Chip label="OTHER" className={classes.chip} align="left" />}
              </CardContent>
            </Card>
          </Grid> : null}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    book: (id) => dispatch(book(id)),
    like: (id) => dispatch(like(id)),
    report: (id) => dispatch(report(id)),
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(PubPost))