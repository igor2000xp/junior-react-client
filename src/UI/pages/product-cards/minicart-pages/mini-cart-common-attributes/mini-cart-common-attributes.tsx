import React from 'react';
import CommonAttributeSetPlp from '../../plp-card/plp-card-blocks/common-atribute-set-plp/common-attribute-set-plp';
import { IProductAttribute } from '../../../common-models';
import MiniCartTextBlock from '../miniCartBlocks/blocks/mini-cart-text-block';
import MiniCartColorBlock from '../miniCartBlocks/blocks/mini-cart-color-block';

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
              <MiniCartColorBlock
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
