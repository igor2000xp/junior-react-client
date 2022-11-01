import React, { Component } from 'react';
import {
  IActiveBasketAttr,
  ICardItemProps,
  ICardItemState,
  ILocalBasket,
  IModifiedProduct,
  IModifiedProducts,
  IProduct,
  localActiveAttributesInit,
  localBasketItemInit,
  modifiedProductInit,
  modifiedProductsInit,
  productInit,
  SymbolCurrency
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
  protected modifiedProducts: IModifiedProducts[] = [modifiedProductsInit];
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

    async componentDidMount()
    {
      const localBasket:ILocalBasket[] = JSON.parse(localStorage.getItem(LOCAL_BASKET) as string) as ILocalBasket[];
      this.props.renewBasket(localBasket);
      this.activeAttr = await JSON.parse(
        localStorage.getItem(LOCAL_BASKET) as string,
      );
      await this.getProductItemsFromLocalBasket();
      await this.setState({
        quantityInBasket: this.props.basket.quantity,
      });
      const id =
        this.props.basket.productId && this.props.basket.productId !== ''
          ? this.props.basket.productId
          : this.state.id;
      await this.setState({id: id});
      const localBasketItem0 = localBasket.find((item) => {
        return item.id === id;
      });
      const localBasketItem = typeof localBasketItem0 !== 'undefined' ? localBasketItem0 : localBasketItemInit;
      this.modifiedProduct = {
        id: localBasketItem.id,
        name: localBasketItem.name,
        brand: localBasketItem.brand,
        prices: localBasketItem.prices,
        attributes: localBasketItem.attributes,
      };
    }

  async componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
  ) {
    if (this.props.currency.symbol !== this.currencySymbol) {
      this.currencySymbol = this.props.currency.symbol;
    }
    if (prevProps.basket.productId !== this.state.id) {
      await this.getProductItemsFromLocalBasket();
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
    if (this.state.quantityInBasket === 0) {
      this.product = productInit;
    }
  }

  protected getQuantityFromStore() {
    const changedCart = this.props.cart;
    const changedCartItem = changedCart.find((item) => {
      return item.id === this.state.id;
    });
    return typeof changedCartItem !== 'undefined' ? changedCartItem.quantity: 0;

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

  protected async getProductItemsFromLocalBasket() {
    this.product.gallery = this.props.basket.gallery;
    this.product.id = this.props.basket.id;
    this.product.attributes = this.props.basket.attributes;
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

  render() { return (<></>); }
}

export default CartItemBlockAbstractClass;
