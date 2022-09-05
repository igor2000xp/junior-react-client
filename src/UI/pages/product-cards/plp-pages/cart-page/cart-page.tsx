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
import BasicBlock from '../../pdp-card/cartBlocks/basic-block';
import CartBasicBlock from '../plp-cart-blocks/cart-basic-block/cart-basic-block';
import {
  ACTIVE_PRODUCT_ATTRIBUTES,
  LOCAL_BASKET,
  LOCAL_CURRENT_CURRENCY,
} from '../../../../../constants';
// import BasicBlock from '../../pdp-card/cartBlocks/basic-block';

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

  constructor(props: IProps) {
    super(props);
    this.state = { id: '' };
  }
  // componentD
  // componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any) {
  // }
  async componentDidMount() {
    this.activeAttr = JSON.parse(localStorage.getItem(LOCAL_BASKET) as string);
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
        this.setState({ id: id });
        console.log(this.activeAttr);
      } catch (err) {
        console.log(`Error ${err} ${id}`, id);
      }
    }
  }

  async componentDidUpdate() {
    // const id = this.props.basket.productId;
    // if (id !== '' || !id) {
    //   try {
    //     const { data } = await client.query({
    //       query: GetProductByIdDocument,
    //       variables: {
    //         id: id,
    //       },
    //     }) ;
    //     this.product = { ...(data.product as IProduct), id };
    //     console.log(this.activeAttr);
    //   } catch (err) {
    //     console.log(`Error ${err} ${id}`, id);
    //   }
    // }
  }

  render() {
    return (
      <article className={styles.wrapper}>
        <aside className={styles.leftSide}>
          <CartBasicBlock
            product={this.product}
            activeAttributes={this.activeAttr[0]}
            currentCurrency={this.props.currency}
          />
        </aside>

        <aside className={styles.rightSide}>
          <section className={styles.buttonSide}>
            <button className={`${styles.buttonQuality}`}>
              <p className={styles.plus} />
            </button>
            <div className={styles.numberInBasket}>
              <p></p>
            </div>
            <button className={styles.buttonQuality}>
              <p className={styles.minus} />
            </button>
          </section>

          <section>
            <div className={styles.imageBlock}>
              <img src="" alt="product image" />
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
