import React from 'react';
import stylesAttr from './main-cart-attr-text.module.css';
import AttributeTextExtended from '../../../../common/common-bloks/common-attribute-set/attribute-blocks/attribute-text-extended';
import { IAttribute } from '../../../../common-models';

class MainCartAttrText extends AttributeTextExtended {
  constructor(props: any) {
    super(props);
    this.state = {
      productId: '',
      activeAttributes: {
        id: this.props.activeAttribute ? this.props.activeAttribute : '',
        value: this.props.attribute.items[0].value,
        attrID: this.props.attribute.id,
      },
    };
  }

  async setFirstAttrActive() {
    await this.setState(() => {
      return {
        activeAttributes: {
          id: this.props.activeAttribute ? this.props.activeAttribute : '',
          value: this.props.attribute.items[0].value,
          attrID: this.props.attribute.id,
        },
      };
    });
  }

  async choiceHandle(item: IAttribute): Promise<void> {
    // return super.choiceHandle(item);
  }

  render() {
    const attr = this.props.attribute.items;
    return (
      <div className={stylesAttr.sizeBlock}>
        <h4>{`${this.props.attribute.name}:`}</h4>
        <div className={stylesAttr.sizeLine}>
          {attr.map((item) => {
            const active =
              item.id === this.state.activeAttributes.id
                ? stylesAttr.active
                : '';
            return (
              <div
                className={`${stylesAttr.sizeItem} ${active}`}
                key={item.id}
                onClick={() => this.choiceHandle(item)}
              >
                <p>{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MainCartAttrText;
