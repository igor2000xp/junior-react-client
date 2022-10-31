import React, { Component } from 'react';
import {
  IActiveBasketAttr, ICardItemProps, ICardItemState,
  IModifiedProducts,
  IProduct,
  localActiveAttributesInit, modifiedProductsInit,
  productInit, SymbolCurrency
} from '../../../common-models';
import { LOCAL_BASKET } from '../../../../../constants';
import { changeQuantityInBasket } from '../helpers';
import client from '../../../../../graphql/apollo';
import { GetProductByIdDocument } from '../../../../../graphql/generated';

type IProps = Readonly<ICardItemProps>;
type IState = Readonly<ICardItemState>;

class CartItemBlockAbstractClass extends Component<IProps, IState> {
  protected product: IProduct = productInit;
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
      // this.plusHandle = this.plusHandle.bind(this);
      // this.minusHandle = this.minusHandle.bind(this);
    }

    async componentDidMount()
    {
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
      await this.setState({id: id});
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
    if (this.state.quantityInBasket === 0) {
      this.product = productInit;
    }
  }

  protected async plusHandle() {
    // this.props.handlePlusMinusButtons();
    await this.setState({
      quantityInBasket: this.state.quantityInBasket + 1,
    });
    await changeQuantityInBasket(
      this.state.quantityInBasket,
      this.props.basket,
    );
    // this.props.handlePlusMinusButtons();
  }
  protected async minusHandle() {
    const minus =
      this.state.quantityInBasket === 0 ? 0 : this.state.quantityInBasket - 1;
    await this.setState({
      quantityInBasket: minus,
    });
    const count = await changeQuantityInBasket(
      this.state.quantityInBasket,
      this.props.basket,
    );
    await this.setState({ quantityInBasket: count });
    // this.props.handlePlusMinusButtons();
  }

  protected async getProductFromDB() {
    const id =
      this.props.basket.productId && this.props.basket.productId !== ''
        ? this.props.basket.productId
        : this.state.id;
    try {
      if (id !== '') {
        const { data } = await client.query({
          query: GetProductByIdDocument,
          variables: {
            id: id,
          },
          fetchPolicy: 'no-cache',
        });
        this.product = { ...(data.product as IProduct), id };
      }
    } catch (err) {
      console.log(`Error loading data from server ${err} ${id}`, id);
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

  render() { return (<></>); }
}

export default CartItemBlockAbstractClass;
