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
import { changeQuantityInBasket } from '../helpers';

type IProps = Readonly<ICardItemProps>;
type IState = Readonly<ICardItemState>;

class CardItem extends Component<IProps, IState> {
  protected product: IProduct = productInit;
  protected activeAttr: IActiveBasketAttr[] = [localActiveAttributesInit];
  protected activeAttrItem: IActiveBasketAttr = localActiveAttributesInit;
  protected modifiedProducts: IModifiedProducts[] = [modifiedProductsInit];
  protected currencySymbol: SymbolCurrency = SymbolCurrency.SymbolUsd;
  protected imageIndex = 0;

  constructor(props: IProps) {
    super(props);
    this.state = {
      id: 'xbox-series-s',
      isModified: false,
      quantityInBasket: 1,
      mainImageIndex: 0,
    };
    this.plusHandle = this.plusHandle.bind(this);
    this.minusHandle = this.minusHandle.bind(this);
  }

  async componentDidMount() {
    this.activeAttr = await JSON.parse(
      localStorage.getItem(LOCAL_BASKET) as string,
    );
    await this.getProductFromDB();
    await this.setState({
      quantityInBasket: this.props.basket.quantity,
    });

    const id =
      this.props.basket.productId && this.props.basket.productId !== ''
        ? this.props.basket.productId
        : this.state.id;
    this.setState({ id: id });
  }

  protected async plusHandle() {
    this.props.handlePlusMinusButtons();
    await this.setState({
      quantityInBasket: this.state.quantityInBasket + 1,
    });
    await changeQuantityInBasket(
      this.state.quantityInBasket,
      this.props.basket,
    );
  }
  protected async minusHandle() {
    this.props.handlePlusMinusButtons();
    const minus =
      this.state.quantityInBasket === 0 ? 0 : this.state.quantityInBasket - 1;
    await this.setState({
      quantityInBasket: minus,
    });
    await changeQuantityInBasket(
      this.state.quantityInBasket,
      this.props.basket,
    );
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
  async handleImagePrev() {
    const images = this.product.gallery;
    this.imageIndex =
      this.imageIndex > 0 ? this.imageIndex - 1 : images.length - 1;
    await this.setState({ mainImageIndex: this.imageIndex });
  }
  async handleImageNext() {
    const images = this.product.gallery;
    this.imageIndex =
      this.imageIndex < images.length - 1 ? this.imageIndex + 1 : 0;
    await this.setState({ mainImageIndex: this.imageIndex });
  }

  render() {
    const modifiedProducts = this.modifiedProducts;
    const prodGallery =
      typeof this.product.gallery !== 'undefined'
        ? this.product.gallery[this.state.mainImageIndex]
        : '';
    const isArrowButtons = !(this.product.gallery.length === 1);

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
            <button
              className={`${styles.buttonQuality}`}
              onClick={this.plusHandle}
            >
              <p className={styles.plus} />
            </button>
            <div className={styles.numberInBasket}>
              {this.state.quantityInBasket}
            </div>
            <button className={styles.buttonQuality} onClick={this.minusHandle}>
              <p className={styles.minus} />
            </button>
          </section>

          <section>
            <div className={styles.imageBlock}>
              <img src={prodGallery} alt="product image" />
              {isArrowButtons ? (
                <button
                  className={`${styles.arrow} ${styles.arrowLeft}`}
                  onClick={() => this.handleImagePrev()}
                >
                  <div className={`${styles.arrowSvgLeft}`} />
                </button>
              ) : (
                <div />
              )}
              {isArrowButtons ? (
                <button
                  className={`${styles.arrow} ${styles.arrowRight}`}
                  onClick={() => this.handleImageNext()}
                >
                  <div className={`${styles.arrowSvgRight}`} />
                </button>
              ) : (
                <div />
              )}
            </div>
          </section>
        </aside>
      </article>
    );
  }
}

export default CardItem;
