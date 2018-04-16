import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles'
import Badge from 'material-ui/Badge'
import Card, { CardHeader } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import { propTypesBet } from '../../../customPropTypes'

const styles = {
  card: {
    minWidth: 275,
  },
  cardEnd: {
    opacity: 0.5,
  },
  deleteBet: {
    color: 'crimson',
  },
  button: {
    display: 'block',
    padding: 0,
    textTransform: 'unset',
    position: 'relative',
  },
  content: {
    maxWidth: 'calc(100% - 56px)',
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  subheader: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  badgeRoot: {
    position: 'absolute',
    right: 4,
    top: 4,
  },
  badgeBadge: {
    color: 'white',
  },
}

class BetCard extends PureComponent {
  static propTypes = {
    bet: propTypesBet.isRequired,
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { bet, classes } = this.props
    return (
      <Card
        component="li"
        className={`${classes.card} ${bet.result && classes.cardEnd}`}
        elevation={4}
        data-test-id="betCard"
      >
        <Button component={Link} className={classes.button} to={`/bet/${bet.id}/view`}>
          {Object.keys(bet.participants).length > 0 && (
            <Badge
              color="secondary"
              badgeContent={Object.keys(bet.participants).length}
              classes={{ root: classes.badgeRoot, badge: classes.badgeBadge }}
            >
              {' '}
            </Badge>
          )}
          <CardHeader
            avatar={bet.title && <Avatar aria-label="Recipe">{bet.title.charAt(0).toUpperCase()}</Avatar>}
            classes={{
              content: classes.content,
              title: classes.title,
              subheader: classes.subheader,
            }}
            component="h3"
            title={bet.title}
            subheader={bet.description}
          />
        </Button>
      </Card>
    )
  }
}

const enhance = compose(withStyles(styles))

export default enhance(BetCard)
