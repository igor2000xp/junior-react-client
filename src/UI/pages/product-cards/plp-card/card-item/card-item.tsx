import React, { Component } from 'react';
import styles from './card-item.module.css';
import {
  IActiveBasketAttr,
  ICurrency,
  ILocalBasket,
  IProduct,
  localActiveAttributesInit,
  productInit,
} from '../../../common-models';
import client from '../../../../../graphql/apollo';
import { GetProductByIdDocument } from '../../../../../graphql/generated';
// import BasicBlock from '../../pdp-card/cardBlocks/basic-block';
import CardBasicBlockPlp from '../plp-card-blocks/card-basic-block/card-basic-block-plp';
import { LOCAL_BASKET } from '../../../../../constants';
// import BasicBlock from '../../pdp-card/cardBlocks/basic-block';

// export interface IProps
export interface ICardItemProps {
  basket: ILocalBasket;
  currency: ICurrency;
}
export interface IState {
  id: string;
}
type IProps = Readonly<ICardItemProps>;

class CardItem extends Component<IProps, IState> {
  private product: IProduct = productInit;
  private activeAttr: IActiveBasketAttr[] = [localActiveAttributesInit];
  private activeAttrItem: IActiveBasketAttr = localActiveAttributesInit;

  constructor(props: IProps) {
    super(props);
    this.state = { id: 'xbox-series-s' };
  }

  async componentDidMount() {
    const activeAttr = await JSON.parse(
      localStorage.getItem(LOCAL_BASKET) as string,
    );
    // console.log(activeAttr);
    this.activeAttr = activeAttr;
    const id =
      this.props.basket.productId && this.props.basket.productId !== ''
        ? this.props.basket.productId
        : this.state.id;
    // if (id) {
    //   console.log(id);
    try {
      const { data } = await client.query({
        query: GetProductByIdDocument,
        variables: {
          id: id,
        },
      });
      this.product = { ...(data.product as IProduct), id };
      this.setState({ id: id });
      // console.log(this.product);
    } catch (err) {
      console.log(`Error ${err} ${id}`, id);
    }
    // this.activeAttrItem = this.activeAttr.find((item) => {
    //   return item.productId === this.product.id;
    // }) as IActiveBasketAttr;
    // console.log(this.activeAttrItem);
    // }
  }

  // componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {
  //
  // }
  async componentDidUpdate(
    prevProps: Readonly<IProps>,
    // prevState: Readonly<IState>,
    // snapshot?: any,
  ) {
    if (prevProps.basket.productId !== this.state.id) {
      const id =
        this.props.basket.productId && this.props.basket.productId !== ''
          ? this.props.basket.productId
          : this.state.id;
      // if (id !== '' || !id) {
      try {
        const { data } = await client.query({
          query: GetProductByIdDocument,
          variables: {
            id: id,
          },
        });
        this.product = { ...(data.product as IProduct), id };
        // console.log(this.activeAttr);
      } catch (err) {
        console.log(`Error ${err} ${id}`, id);
      }
      this.activeAttrItem = this.activeAttr.find((item) => {
        return item.productId === this.product.id;
      }) as IActiveBasketAttr;
      // }
    }
  }

  render() {
    // console.log(this.props.currency);
    // const currencySymbol = this.props.
    const prodGallery =
      typeof this.product.gallery !== 'undefined'
        ? this.product.gallery[0]
        : '';
    return (
      <article className={styles.wrapper}>
        <aside className={styles.leftSide}>
          <CardBasicBlockPlp
            product={this.product}
            activeAttributes={this.activeAttrItem}
            currentCurrency={this.props.currency.symbol}
          />
        </aside>

        <aside className={styles.rightSide}>
          <section className={styles.buttonSide}>
            <button className={`${styles.buttonQuality}`}>
              <p className={styles.plus} />
            </button>
            <div className={styles.numberInBasket}>
              {/*<p>{this.activeAttr}</p>*/}
            </div>
            <button className={styles.buttonQuality}>
              <p className={styles.minus} />
            </button>
          </section>

          <section>
            <div className={styles.imageBlock}>
              <img src={prodGallery} alt="product image" />
              <button className={`${styles.arrow} ${styles.arrowLeft}`}>
                <div className={`${styles.arrowSvgLeft}`} />
              </button>
              <button className={`${styles.arrow} ${styles.arrowRight}`}>
                <div className={`${styles.arrowSvgRight}`} />
              </button>
            </div>
          </section>
        </aside>
      </article>
    );
  }
}

export default CardItem;
