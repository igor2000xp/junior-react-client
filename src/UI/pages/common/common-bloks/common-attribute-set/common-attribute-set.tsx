import React, { Component } from 'react';
// import AttributeText from './attribute-blocks/attribute-text';
import AttributeColorSwatch, {
  IAttributeColorSwatchState,
  activeAttributesInit,
  IAttrActive,
} from './attribute-blocks/attribute-color-swatch';
import AttributeTextExtended from './attribute-blocks/attribute-text-extended';
import { ACTIVE_PRODUCT_ATTRIBUTES } from '../../../../../constants';

export interface ICommonAttributeSetProps {
  attributes: IAttribute[];
  productID: string;
}
export interface IAttribute {
  id: string;
  name: string;
  type: string;
  items: IAttrItem[];
}
export interface IAttrItem {
  id: string;
  displayValue: string;
  value: string;
}
export const printToLocalStorageInit = {
  productId: '',
  activeAttributes: [{ ...activeAttributesInit }],
};
// export interface IAttributeColorSwatchState {
//   productId: string;
//   activeAttributes: IAttrActive;
// }
// export interface IAttrActive {
//   id: string;
//   value: string;
// }
// export interface ICommonAttributeSetState extends IAttributeColorSwatchState {}

type IProps = Readonly<ICommonAttributeSetProps>;
// type IState = Readonly<IAttributeColorSwatchState>;

class CommonAttributeSet extends Component<IProps> {
  private readonly arrResultToStorage: IAttrActive[];
  constructor(props: IProps) {
    super(props);
    this.handleAttributes = this.handleAttributes.bind(this);
    this.arrResultToStorage = [{ ...activeAttributesInit }];
  }

  async componentDidMount() {
    localStorage.setItem(
      ACTIVE_PRODUCT_ATTRIBUTES,
      JSON.stringify(printToLocalStorageInit),
    );
  }

  private handleAttributes(value: IAttributeColorSwatchState) {
    this.checkHandleAttributes(value);
    const printToLocalStorage = {
      productId: this.props.productID,
      activeAttributes: this.arrResultToStorage,
    };
    localStorage.setItem(
      ACTIVE_PRODUCT_ATTRIBUTES,
      JSON.stringify(printToLocalStorage),
    );
    console.log(printToLocalStorage);
  }
  private checkHandleAttributes(value: IAttributeColorSwatchState) {
    // This is a test to see if this is the initial step.
    if (!this.arrResultToStorage[0].id) {
      this.arrResultToStorage[0] = value.activeAttributes;
    }
    // This is a test to see if there is an element in the array that looks like new.
    const isItem = this.arrResultToStorage.findIndex((item) => {
      return item.attrID === value.activeAttributes.attrID;
    });
    if (isItem === -1) {
      this.arrResultToStorage.push(value.activeAttributes);
    } else if (isItem > -1) {
      this.arrResultToStorage[isItem] = { ...value.activeAttributes };
    }
  }

  render() {
    const attr = this.props.attributes;
    return (
      <>
        {attr.map((item) => {
          const isText = item.type === 'text';
          const isColor = item.type === 'swatch';

          if (isText) {
            return (
              <AttributeTextExtended
                attribute={item}
                key={item.id}
                getAttrState={this.handleAttributes}
              />
            );
          } else if (isColor) {
            return (
              <AttributeColorSwatch
                attribute={item}
                key={item.id}
                getAttrState={this.handleAttributes}
              />
            );
          } else return '';
        })}
      </>
    );
  }
}

export default CommonAttributeSet;
