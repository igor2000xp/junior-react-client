import React, { Component } from 'react';
import styleName from './name-block.module.css';

class NameBlock extends Component {
  render() {
    return (
      <section className={styleName.wrapper}>
        <div className={styleName.brand}>
          <h2>Apollo</h2>
        </div>

        <div className={styleName.name}>
          <h3>Running Short</h3>
        </div>
      </section>
    );
  }
}

export default NameBlock;
