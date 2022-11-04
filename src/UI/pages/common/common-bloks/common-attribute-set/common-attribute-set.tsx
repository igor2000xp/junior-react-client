import React, { Component } from 'react';
import AttributeColorSwatch from './attribute-blocks/attribute-color-swatch';
import AttributeTextExtended from './attribute-blocks/attribute-text-extended';
import { ACTIVE_PRODUCT_ATTRIBUTES } from '../../../../../constants';
import {
  activeAttributesInit,
  IAttrActive,
  IAttributeColorSwatchState,
  ICommonAttributeSet,
  ICommonAttributeSetProps,
} from '../../../common-models';

type IProps = Readonly<ICommonAttributeSetProps>;
type IState = Readonly<ICommonAttributeSet>;

class CommonAttributeSet extends Component<IProps, IState> {
  protected readonly arrResultToStorage: IAttrActive[];
  constructor(props: IProps) {
    super(props);
    this.handleAttributes = this.handleAttributes.bind(this);
    this.arrResultToStorage = [{ ...activeAttributesInit }];
    this.state = { prodId: '' };
  }

  componentDidMount() {
  }

  protected handleAttributes(value: IAttributeColorSwatchState) {
    this.renewHandleAttributes(value);
  }
  protected renewHandleAttributes(value: IAttributeColorSwatchState) {
    // This is a test to see if this is the initial step.
    if (this.arrResultToStorage[0].id === '') {
      this.arrResultToStorage.shift();
      const arrResultToStorage:IAttrActive[] = JSON.parse(localStorage.getItem(ACTIVE_PRODUCT_ATTRIBUTES) as string);
      Array.prototype.push.apply(this.arrResultToStorage, arrResultToStorage);
    }
    // This is a test to see if there is an element in the array that looks like new.
    const isItemSame = this.arrResultToStorage.findIndex((item) => {
      return item.attrID === value.activeAttributes.attrID;
    });
    if (isItemSame === -1) {
      this.arrResultToStorage.push(value.activeAttributes);
    } else if (isItemSame > -1) {
      this.arrResultToStorage[isItemSame] = { ...value.activeAttributes };
      localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify(this.arrResultToStorage));
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
                // activeAttribute={item.items[0].value}
                activeAttribute={''}
                key={item.id}
                getAttrState={this.handleAttributes}
              />
            );
          } else if (isColor) {
            return (
              <AttributeColorSwatch
                attribute={item}
                activeAttribute={''}
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
