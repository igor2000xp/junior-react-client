import React, { Component } from 'react';
import styles from './common-attribute-set-plp.module.css';
import CommonAttributeSet from '../../../../common/common-bloks/common-attribute-set/common-attribute-set';
import AttributeTextExtended
  from '../../../../common/common-bloks/common-attribute-set/attribute-blocks/attribute-text-extended';
import AttributeColorSwatch
  from '../../../../common/common-bloks/common-attribute-set/attribute-blocks/attribute-color-swatch';
import {
  activeAttributesInit,
  IAttrActive,
  IAttributeColorSwatchState,
  ICommonAttributeSetProps, productAttributeInit
} from '../../../../common-models';
import { ACTIVE_PRODUCT_ATTRIBUTES } from '../../../../../../constants';

type IProps = Readonly<ICommonAttributeSetProps>;

class CommonAttributeSetPlp extends CommonAttributeSet {
  readonly arrResultToStorage: IAttrActive[];

  constructor(props: IProps) {
    super(props);
    this.handleAttributes = this.handleAttributes.bind(this);
    this.arrResultToStorage = [{ ...activeAttributesInit }];
  }

  // private handleAttributes(value: IAttributeColorSwatchState) {
  //   this.renewHandleAttributes(value);
  //   localStorage.setItem(
  //     ACTIVE_PRODUCT_ATTRIBUTES,
  //     JSON.stringify(this.arrResultToStorage),
  //   );
  // }


  render() {
    const attr = typeof this.props.attributes !== 'undefined' ? this.props.attributes: [{ ...productAttributeInit }] ;
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

export default CommonAttributeSetPlp;
