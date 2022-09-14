import React, { Component } from 'react';
import styles from './card-item.module.css';
import {
  IActiveBasketAttr,
  ICardItemProps,
  ICardItemState,
  IModifiedProducts,
  IProduct,
  localActiveAttributesInit,
  modifiedProductsInit,
  productInit,
  SymbolCurrency,
} from '../../../common-models';
import client from '../../../../../graphql/apollo';
import { GetProductByIdDocument } from '../../../../../graphql/generated';
import CardBasicBlockPlp from '../plp-card-blocks/card-basic-block/card-basic-block-plp';
import { LOCAL_BASKET } from '../../../../../constants';

type IProps = Readonly<ICardItemProps>;
type IState = Readonly<ICardItemState>;

class CardItem extends Component<IProps, IState> {
  private product: IProduct = productInit;
  private activeAttr: IActiveBasketAttr[] = [localActiveAttributesInit];
  private activeAttrItem: IActiveBasketAttr = localActiveAttributesInit;
  private modifiedProducts: IModifiedProducts[] = [modifiedProductsInit];
  private currencySymbol: SymbolCurrency = SymbolCurrency.SymbolUsd;

  constructor(props: IProps) {
    super(props);
    this.state = { id: 'xbox-series-s', isModified: false };
  }

  async componentDidMount() {
    this.activeAttr = await JSON.parse(
      localStorage.getItem(LOCAL_BASKET) as string,
    );
    await this.getProductFromDB();

    const id =
      this.props.basket.productId && this.props.basket.productId !== ''
        ? this.props.basket.productId
        : this.state.id;
    this.setState({ id: id });
  }

  async componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
  ) {
    if (this.props.currency.symbol !== this.currencySymbol) {
      this.currencySymbol = this.props.currency.symbol;
    }
    if (prevProps.basket.productId !== this.state.id) {
      await this.getProductFromDB();
      this.activeAttrItem = this.activeAttr.find((item) => {
        return item.productId === this.product.id;
      }) as IActiveBasketAttr;
    }
    if (!prevState.isModified) {
      this.modifiedProducts = this.product.attributes.map((item) => {
        const activeItem = this.props.basket.activeAttributes.find(
          (activeItem) => {
            return activeItem.attrID === item.id;
          },
        );
        return {
          productID: this.props.basket.productId,
          id: item.id,
          type: item.type, // text, color
          name: item.name, // "Shoe Size" === attrId
          items: item.items, // Array<IAttribute>
          activeItem: activeItem ? activeItem.id : '',
        };
      });
      this.setState({ isModified: true });
    }
  }

  private async getProductFromDB() {
    const id =
      this.props.basket.productId && this.props.basket.productId !== ''
        ? this.props.basket.productId
        : this.state.id;
    try {
      const { data } = await client.query({
        query: GetProductByIdDocument,
        variables: {
          id: id,
        },
      });
      this.product = { ...(data.product as IProduct), id };
    } catch (err) {
      console.log(`Error ${err} ${id}`, id);
    }
  }

  render() {
    const modifiedProducts = this.modifiedProducts;
    const prodGallery =
      typeof this.product.gallery !== 'undefined'
        ? this.product.gallery[0]
        : '';
    return (
      <article className={styles.wrapper}>
        <aside className={styles.leftSide}>
          <CardBasicBlockPlp
            product={this.product}
            modifiedProducts={modifiedProducts}
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
