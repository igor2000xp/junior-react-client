import React from 'react';
import CommonAttributeSet from '../../../../common/common-bloks/common-attribute-set/common-attribute-set';
import {
  ICommonAttributeSetProps,
  IProductAttribute,
} from '../../../../common-models';
import { ACTIVE_PRODUCT_ATTRIBUTES } from '../../../../../../constants';
import AttrColorPlp from '../attr-color-plp/attr-color-plp';
import AttrTextPlp from '../attr-text-plp/attr-text-plp';

type IProps = Readonly<ICommonAttributeSetProps>;
export interface IState {
  prodId: string;
}

class CommonAttributeSetPlp extends CommonAttributeSet {
  constructor(props: IProps) {
    super(props);
    this.handleAttributes = this.handleAttributes.bind(this);
    this.state = { prodId: '' };
  }
  protected handleAttributes() {
    // console.log('handleAttributes');
  }

  async componentDidMount(): Promise<void> {
    await super.componentDidMount();
  }

  protected async renewHandleAttributes(value: any) {
    await localStorage.setItem(ACTIVE_PRODUCT_ATTRIBUTES, JSON.stringify([]));
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
