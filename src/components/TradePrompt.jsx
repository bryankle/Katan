import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Grid } from 'semantic-ui-react'
import wheat from '../images/wheat.jpg'
import brick from '../images/brick.jpg'
import sheep from '../images/sheep.jpg'
import wood from '../images/wood.jpg'
import ore from '../images/ore.jpg'
import { initiateTrade } from '../utils'

const images = [wheat, brick, sheep, wood, ore]

class TradePrompt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: props.currentGame.players[localStorage.getItem(props.gameId)].trade || false,
      acceptDisabled: true
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }

  componentDidMount(){
    let localPlayer = this.props.currentGame.players[localStorage.getItem(this.props.gameId)]
    let exchangeResource = this.props.currentGame.trade.exchange
    let reKey = Object.keys(exchangeResource)
    if (!reKey.find(key => exchangeResource[key] > localPlayer[key])) {
       this.setState({ acceptDisabled: false })}
  }

  handleOpen(){this.setState({ open: true })}
  handleClose(){this.setState({ open: false })}

  render(){
    const { currentGame, gameId } = this.props

    return(
      <Modal
          open={this.state.open}
          onClose={this.handleClose}>
          <h1 style={{ textAlign: 'center' }}> I am offering </h1>
          <Grid divided='vertically'>
            <Grid.Row columns={5}>
              {['wheat', 'brick', 'sheep', 'wood', 'ore'].map((resource, idx) => (
                <Grid.Column key={idx}>
                  <img src={images[idx]} style={{ width: '70%' }} alt=''/>
                  { currentGame &&
                    <h3 style={{textAlign: 'center'}}>{currentGame.trade.offer[resource] ?  currentGame.trade.offer[resource] : '0'}</h3> }
                </Grid.Column>
              ))}
            </Grid.Row>
            <div style={{ width: '100%' }}>
              <h1 style={{ textAlign: 'center' }} width={'100%'}> In exchange for </h1>
            </div>
            <Grid.Row columns={5}>
              {['wheat', 'brick', 'sheep', 'wood', 'ore'].map((resource, idx) => (
                <Grid.Column key={idx}>
                  <img src={images[idx]} style={{ width: '70%' }} alt=''/>
                  { currentGame &&
                  <h3 style={{textAlign: 'center'}}>{currentGame.trade.exchange[resource] ?  currentGame.trade.exchange[resource] : '0'}</h3>
                  }
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
          <Modal.Actions>
            <Button color='blue' disabled={this.state.acceptDisabled} inverted onClick={() => {
              initiateTrade(currentGame.game.currentPlayer, localStorage.getItem(gameId), currentGame.trade.offer, currentGame.trade.exchange, gameId)
              this.handleClose()
              }
            }>
              Accept
        </Button>
            <Button color='blue' inverted onClick={this.handleClose}>
              Cancel
        </Button>
          </Modal.Actions>
        </Modal>
    )
  }
}
export default connect()(TradePrompt);
