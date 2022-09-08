import React, { Component } from 'react';
import AttributeColorSwatch from './attribute-blocks/attribute-color-swatch';
import AttributeTextExtended from './attribute-blocks/attribute-text-extended';
import { ACTIVE_PRODUCT_ATTRIBUTES } from '../../../../../constants';
import {
  activeAttributesInit,
  IAttrActive,
  IAttributeColorSwatchState,
  ICommonAttributeSetProps,
  printToLocalStorageInit,
} from '../../../common-models';

type IProps = Readonly<ICommonAttributeSetProps>;

class CommonAttributeSet extends Component<IProps> {
  private readonly arrResultToStorage: IAttrActive[];
  private activeAttributeInRow = '';
  constructor(props: IProps) {
    super(props);
    this.handleAttributes = this.handleAttributes.bind(this);
    this.arrResultToStorage = [{ ...activeAttributesInit }];
  }

  async componentDidMount() {
    localStorage.setItem(
      ACTIVE_PRODUCT_ATTRIBUTES,
      JSON.stringify([]),
    );
    console.log(this.props);
  }

  private handleAttributes(value: IAttributeColorSwatchState) {
    this.checkHandleAttributes(value);
    const printToLocalStorage = {
      productId: this.props.productID,
      activeAttributes: this.arrResultToStorage,
    };
    // if (printToLocalStorage.productId === '') {
      // localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
    // }
    console.log(printToLocalStorage);
    let localPrintToLocalStorage = JSON.parse(localStorage.getItem(ACTIVE_PRODUCT_ATTRIBUTES) as string);
    localPrintToLocalStorage.push(printToLocalStorage);
    console.log(localPrintToLocalStorage);
    this.activeAttributeInRow = value.activeAttributes.value;
    // console.log(this.activeAttributeInRow);
    localStorage.setItem(
      ACTIVE_PRODUCT_ATTRIBUTES,
      JSON.stringify(localPrintToLocalStorage),
    );
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
    const activeAttributeInRow = this.activeAttributeInRow;
    return (
      <>
        {attr.map((item) => {
          const isText = item.type === 'text';
          const isColor = item.type === 'swatch';

          if (isText) {
            return (
              <AttributeTextExtended
                attribute={item}
                activeAttributeInRow={''}
                key={item.id}
                getAttrState={this.handleAttributes}
              />
            );
          } else if (isColor) {
            return (
              <AttributeColorSwatch
                attribute={item}
                activeAttributeInRow={''}
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
