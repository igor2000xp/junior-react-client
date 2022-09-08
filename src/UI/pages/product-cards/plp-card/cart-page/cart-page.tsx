import React, { Component } from 'react';
import styles from './cart-page.module.css';
import {
  activeAttributesInit,
  IActiveAttr,
  ICurrency,
  ILocalBasket,
  IProduct,
  localActiveAttributesInit,
  productInit,
  SymbolCurrency,
} from '../../../common-models';
import client from '../../../../../graphql/apollo';
import {
  GetProductByIdDocument,
  GetProductByIdQuery,
} from '../../../../../graphql/generated';
import BasicBlock from '../../pdp-card/cardBlocks/basic-block';
import CardBasicBlock from '../plp-card-blocks/card-basic-block/card-basic-block';
import {
  ACTIVE_PRODUCT_ATTRIBUTES,
  LOCAL_BASKET,
  LOCAL_CURRENT_CURRENCY,
} from '../../../../../constants';
// import BasicBlock from '../../pdp-card/cardBlocks/basic-block';

// export interface IProps
export interface ICartPageProps {
  basket: ILocalBasket;
  currency: SymbolCurrency;
}
export interface IState {
  id: string;
}
type IProps = Readonly<ICartPageProps>;

class CartPage extends Component<IProps, IState> {
  private product: IProduct = productInit;
  private activeAttr: IActiveAttr[] = [localActiveAttributesInit];
  private activeAttrItem: IActiveAttr = localActiveAttributesInit;

  constructor(props: IProps) {
    super(props);
    this.state = { id: 'xbox-series-s' };
  }
  // componentD
  // componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {
  // }
  async componentDidMount() {
    this.activeAttr = JSON.parse(localStorage.getItem(LOCAL_BASKET) as string);
    const id = this.props.basket.productId;
    if (id !== '' && !id) {
      console.log(id);
      try {
        const { data } = await client.query({
          query: GetProductByIdDocument,
          variables: {
            id: id,
          },
        });
        this.product = { ...(data.product as IProduct), id };
        this.setState({ id: id });
        // console.log(this.activeAttr);
      } catch (err) {
        console.log(`Error ${err} ${id}`, id);
      }
      this.activeAttrItem = this.activeAttr.find((item) => {
        return item.productId === this.product.id;
      }) as IActiveAttr;
      // console.log(this.activeAttrItem);
    }
  }

  async componentDidUpdate() {
    const id = this.props.basket.productId;
    if (id !== '' || !id) {
      try {
        const { data } = await client.query({
          query: GetProductByIdDocument,
          variables: {
            id: id,
          },
        });
        this.product = { ...(data.product as IProduct), id };
        console.log(this.activeAttr);
      } catch (err) {
        console.log(`Error ${err} ${id}`, id);
      }
    }
  }

  render() {
    // console.log(this.props.currency);
    // const currencySymbol = this.props.
    return (
      <article className={styles.wrapper}>
        <aside className={styles.leftSide}>
          <CardBasicBlock
            product={this.product}
            activeAttributes={this.activeAttrItem}
            currentCurrency={this.props.currency}
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
              <img src={this.product.gallery[0]} alt="product image" />
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

export default CartPage;
