import React, { Component } from 'react';
import styles from './text-block.module.css';
import parse from 'html-react-parser';

interface IProps {
  text: string;
}
class TextBlock extends Component<IProps> {
  render() {
    return (
      <section className={styles.wrapper}>{parse(this.props.text)}</section>
    );
  }
}

export default TextBlock;
