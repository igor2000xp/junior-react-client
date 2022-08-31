import React, { Component } from 'react';
import styles from './text-block.module.css';

interface IProps {
  text: string;
}
class TextBlock extends Component<IProps> {
  createMarkup() {
    return { __html: `${this.props.text}` };
  }
  render() {
    return (
      <section
        className={styles.wrapper}
        dangerouslySetInnerHTML={this.createMarkup()}
      ></section>
    );
  }
}

export default TextBlock;
