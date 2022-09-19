import React from 'react';
import CommonAttributeSet from '../../../../common/common-bloks/common-attribute-set/common-attribute-set';
import {
  ICommonAttributeSetProps,
  ILocalBasket,
  IProductAttrForPrint,
  IProductAttribute,
  localActiveAttributesPdpInit,
  productAttrForPrintInit,
} from '../../../../common-models';
import { LOCAL_BASKET } from '../../../../../../constants';
import AttrColorPlp from '../attr-color-plp/attr-color-plp';
import AttrTextPlp from '../attr-text-plp/attr-text-plp';

type IProps = Readonly<ICommonAttributeSetProps>;
export interface IState {
  prodId: string;
}

class CommonAttributeSetPlp extends CommonAttributeSet {
  protected productAttrForPrint: IProductAttrForPrint[] = [
    productAttrForPrintInit,
  ];

  constructor(props: IProps) {
    super(props);
    this.handleAttributes = this.handleAttributes.bind(this);
    this.state = { prodId: '' };
  }

  async componentDidMount(): Promise<void> {
    await super.componentDidMount();
    await this.getActiveAttributes();
  }

  async componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
  ) {
    if (
      this.props.productID !== prevProps.productID ||
      prevState.prodId != this.state.prodId
    ) {
      await this.getActiveAttributes();
    }
  }

  async getActiveAttributes() {
    const act: ILocalBasket[] = await JSON.parse(
      localStorage.getItem(LOCAL_BASKET) as string,
    );
    const localBasketItem: ILocalBasket | undefined = act.find((item) => {
      return item.productId === this.props.productID;
    });
    this.productAttrForPrint = act.map((item) => {
      return {
        productID: item.productId,
        quantity: localBasketItem?.quantity ? localBasketItem.quantity : 0,
        additionalId: item.activeAttributes.reduce((acc, reducedItem) => {
          return `${acc}=${reducedItem.id}`;
        }, item.productId),
        activeAttributes: localBasketItem?.activeAttributes
          ? localBasketItem.activeAttributes
          : [{ ...localActiveAttributesPdpInit }],
        attributes: this.props.attributes,
      };
    });
  }

  render() {
    const modProd = this.props.modifiedProducts;
    return (
      <>
        {modProd?.map((item) => {
          const isText = item.type === 'text';
          const isColor = item.type === 'swatch';
          const attribute: IProductAttribute = {
            id: item.id,
            name: item.name,
            type: item.type,
            items: item.items,
          };
          if (isText) {
            return (
              <AttrTextPlp
                attribute={attribute}
                getAttrState={this.handleAttributes}
                key={item.id}
                activeAttribute={item.activeItem}
              />
            );
          } else if (isColor) {
            return (
              <AttrColorPlp
                attribute={attribute}
                getAttrState={this.handleAttributes}
                key={item.id}
                activeAttribute={item.activeItem}
              />
            );
          }
        })}
      </>
    );
  }
}

export default CommonAttributeSetPlp;
