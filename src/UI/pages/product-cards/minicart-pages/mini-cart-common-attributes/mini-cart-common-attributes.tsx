import React, { Component } from 'react';
import styles from './miniCartCommonAttributes.module.css';
import CommonAttributeSetPlp from '../../plp-card/plp-card-blocks/common-atribute-set-plp/common-attribute-set-plp';
import { IProductAttribute } from '../../../common-models';
import AttrTextPlp from '../../plp-card/plp-card-blocks/attr-text-plp/attr-text-plp';
import AttrColorPlp from '../../plp-card/plp-card-blocks/attr-color-plp/attr-color-plp';
import MiniCartTextBlock from '../miniCartBlocks/blocks/mini-cart-text-block';

export interface MiniCartCommonAttributesProps {}

class MiniCartCommonAttributes extends CommonAttributeSetPlp {
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
              <MiniCartTextBlock
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

export default MiniCartCommonAttributes;
