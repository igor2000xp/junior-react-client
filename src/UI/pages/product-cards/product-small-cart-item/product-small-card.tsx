import React, { Component } from 'react';
import styles from './product-small-card.module.css';
import PriceBlock from '../../common/common-bloks/price-block/price-block';
import { IProduct, SymbolCurrency, IPrice } from '../../common-models';
import cartImage from '../../../../assets/images/Icon/CircleIcon.svg';
import {
  getFirstProdAttrAsActiveAttr,
  settleFullBasket,
} from '../pdp-card/cardBlocks/helpers';
import { LOCAL_BASKET } from '../../../../constants';

interface IProductSmallCardProps {
  item: IProduct;
  symbolCurrency: SymbolCurrency;
  handleGreenButtonFromSmallCart: () => void;
}
type IProps = Readonly<IProductSmallCardProps>;
// type IProps = WithRouterProps<IProductSmallCardProps>;

class ProductSmallCard extends Component<IProps, any> {
  private id: string;
  private gallery: string;
  private readonly name: string;
  private brand: string;
  private price: IPrice | IPrice[];

  constructor(props: IProps) {
    super(props);
    this.id = this.props.item.id;
    this.gallery = '';
    this.name = this.props.item.name;
    this.brand = this.props.item.brand;
    this.price = this.props.item.prices;
    this.handleGreenButton = this.handleGreenButton.bind(this);
  }

  async handleGreenButton() {
    const localBasket = await JSON.parse(
      localStorage.getItem(LOCAL_BASKET) as string,
    );
    const attr = getFirstProdAttrAsActiveAttr(this.props.item);
    const newLocalBasket = settleFullBasket(
      localBasket,
      attr,
      this.props.item.id,
    );
    localStorage.setItem(LOCAL_BASKET, JSON.stringify(newLocalBasket));
    this.props.handleGreenButtonFromSmallCart();
  }

  render() {
    const name = `${this.props.item.brand} ${this.props.item.name}`;
    const firstGallery = this.props.item.gallery;
    if (!this.props.item.gallery) {
      this.gallery = '';
    } else if (Array.isArray(firstGallery))
      this.gallery = firstGallery[0] ? firstGallery[0] : '';
    const id = this.props.item.id;
    const greenButton = !this.props.item.inStock
      ? styles.outStore
      : styles.greenButtonCart;
    return (
      <section className={styles.card}>
        <div className={styles.bigImage}>
          <img src={this.gallery} alt="product image" />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}
        >
          <button className={greenButton} onClick={this.handleGreenButton}>
            <img src={cartImage} alt="to Cart button" />
          </button>
        </div>
        <article className={styles.textBlock}>
          <div className={styles.nameBlock}>
            <p>{name}</p>
          </div>
          <div className={styles.priceBlock}>
            <PriceBlock id={id} symbolCurrency={this.props.symbolCurrency} />
          </div>
        </article>
      </section>
    );
  }
}

// export default withRouter(ProductSmallCard);
export default ProductSmallCard;
