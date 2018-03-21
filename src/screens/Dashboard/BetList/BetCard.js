import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import Card, { CardHeader } from 'material-ui/Card'
import { format } from 'date-fns'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'

import { deleteBetService } from '../../../services/bet.service'

const styles = {
  card: {
    minWidth: 275,
  },
  deleteBet: {
    color: 'crimson',
  },
}

class BetCard extends PureComponent {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  deleteBet = () => {
    this.handleClose()
    deleteBetService(this.props.bet.id)
  }

  render() {
    const { anchorEl } = this.state
    const { bet, classes } = this.props
    return (
      <Card component="li" className={classes.card} elevation={4}>
        <CardHeader
          avatar={<Avatar aria-label="Recipe">{bet.title.charAt(0).toUpperCase()}</Avatar>}
          action={
            <IconButton aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          component="h3"
          title={bet.title}
          subheader={`created: ${format(bet.timestamp, 'dddd, DD MMM, YYYY')}`}
        />
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <MenuItem onClick={this.handleClose}>Edit</MenuItem>
          <MenuItem onClick={this.deleteBet} className={classes.deleteBet}>
            Delete
          </MenuItem>
        </Menu>
        {/*<CardContent>*/}
      </Card>
    )
  }
}

BetCard.propTypes = {
  bet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
  }).isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({ bets: state.dashboard.bets })

const enhance = compose(connect(mapStateToProps), withStyles(styles))

export default enhance(BetCard)