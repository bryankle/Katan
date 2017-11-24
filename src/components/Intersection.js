import React, { Component } from "react";
import { Circle } from "react-konva";
import { buildCity, buildSettlement } from '../utils'

class Intersection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, x, y, color, type, currentGame, gameId } = this.props;
    console.log(type)
    let stroke, strokeWidth, radius;
    if (type === 'city') { radius = 14; stroke = 'black'; strokeWidth = '5' } else {
      radius = 7; stroke = ''; strokeWidth = ''
    }

    return (
      <Circle
        x={x}
        y={y}
        radius={radius}
        fill={color}
        stroke={stroke}
        strokeWidth={strokeWidth}
        shadowBlur={5}
        onClick={ e => {
          (currentGame.intersectionNodes[id].settlement === true) ? buildCity(currentGame.game.currentPlayer, gameId, id, 1) :
            buildSettlement(currentGame.game.currentPlayer, gameId, id, 1)}}
        listening={currentGame.intersectionNodes[id].active}
      />
    );
  }
}

export default Intersection;