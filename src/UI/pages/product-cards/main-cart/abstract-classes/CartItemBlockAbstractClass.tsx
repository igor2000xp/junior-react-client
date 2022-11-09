import React, { Component } from 'react';
import {
  IActiveBasketAttr,
  ICardItemProps,
  ICardItemState,
  ILocalBasket,
  IModifiedProduct,
  IModifiedAttrProducts,
  IProduct,
  localActiveAttributesInit,
  modifiedProductInit,
  modifiedAttrProductsInit,
  productInit,
  SymbolCurrency,
} from '../../../common-models';
import { LOCAL_BASKET } from '../../../../../constants';
import { changeQuantityInBasket } from '../helpers';

type IProps = Readonly<ICardItemProps>;
type IState = Readonly<ICardItemState>;

class CartItemBlockAbstractClass extends Component<IProps, IState> {
  protected product: IProduct = productInit;
  protected modifiedProduct: IModifiedProduct = modifiedProductInit;
  protected activeAttr: IActiveBasketAttr[] = [localActiveAttributesInit];
  protected activeAttrItem: IActiveBasketAttr = localActiveAttributesInit;
  protected modifiedAttrProducts: IModifiedAttrProducts[] = [
    modifiedAttrProductsInit,
  ];
  protected currencySymbol: SymbolCurrency = SymbolCurrency.SymbolUsd;
  protected imageIndex = 0;

  constructor(props: IProps) {
    super(props);
    this.state = {
      id: '',
      isModified: false,
      quantityInBasket: 1,
      mainImageIndex: 0,
    };
    this.plusHandle = this.plusHandle.bind(this);
    this.minusHandle = this.minusHandle.bind(this);
  }

  async componentDidMount() {
    const localBasket: ILocalBasket[] = (await JSON.parse(
      localStorage.getItem(LOCAL_BASKET) as string,
    )) as ILocalBasket[];
    this.props.renewBasket(localBasket);
    this.activeAttr = await JSON.parse(
      localStorage.getItem(LOCAL_BASKET) as string,
    );
    await this.getProductItemsFromProps();
    await this.setState({
      quantityInBasket: this.props.basket.quantity,
    });
    const id =
      this.props.basket.productIdAttr && this.props.basket.productIdAttr !== ''
        ? this.props.basket.productIdAttr
        : this.state.id;
    await this.setState({ id: id });
  }

  async componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
  ) {
    if (this.props.currency.symbol !== this.currencySymbol) {
      this.currencySymbol = this.props.currency.symbol;
    }
    if (prevProps.basket.productIdAttr !== this.state.id) {
      this.activeAttrItem = this.activeAttr.find((item) => {
        return item.productId === this.product.id;
      }) as IActiveBasketAttr;
    }
    if (prevProps.basketId !== this.props.basketId) {
      await this.getProductItemsFromProps();
      this.setState({ isModified: true });
    }
    if (this.state.quantityInBasket === 0) {
      this.product = productInit;
    }
  }

  protected getQuantityFromStore() {
    const changedCart = this.props.cart;
    const changedCartItem = changedCart.find((item) => {
      const complexId =
        JSON.stringify(this.props.basket.activeAttributes) +
        this.props.basket.id;
      const complexIdItem = JSON.stringify(item.activeAttributes) + item.id;
      return complexIdItem === complexId;
    });
    const quantityInBasket =
      typeof changedCartItem !== 'undefined' ? changedCartItem.quantity : 0;
    this.setState({ quantityInBasket });
    return quantityInBasket;
  }

  protected async plusHandle() {
    const plus = this.getQuantityFromStore();
    await this.setState({
      quantityInBasket: plus + 1,
    });
    const newBasketForRecord = await changeQuantityInBasket(
      plus + 1,
      this.props.basket,
    );
    this.props.renewBasket(newBasketForRecord);
  }

  protected async minusHandle() {
    const minus = this.getQuantityFromStore();
    await this.setState({
      quantityInBasket: minus - 1,
    });
    const newBasketForRecord = await changeQuantityInBasket(
      minus - 1,
      this.props.basket,
    );
    this.props.renewBasket(newBasketForRecord);
  }

  protected async getProductItemsFromProps() {
    this.product.gallery = this.props.basket.gallery;
    this.product.id = this.props.basketId;
    this.product.attributes = this.props.basket.attributes;
    this.modifiedProduct = {
      id: this.props.basket.id,
      name: this.props.basket.name,
      brand: this.props.basket.brand,
      prices: this.props.basket.prices,
      attributes: this.props.basket.attributes,
    };
    this.modifiedAttrProducts = this.props.basket.attributes.map((item) => {
      const activeItem = this.props.basket.activeAttributes.find(
        (activeItem) => {
          return activeItem.attrID === item.id;
        },
      );
      return {
        productID: this.props.basket.productIdAttr,
        id: item.id,
        type: item.type, // text, color
        name: item.name, // "Shoe Size" === attrId
        items: item.items, // Array<IAttribute>
        activeItem: activeItem ? activeItem.id : '',
      };
    });
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
    return <></>;
  }
}

export default CartItemBlockAbstractClass;
