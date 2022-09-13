import React from 'react';
import stylesColor from './attr-color-plp.module.css';
import AttributeColorSwatch from '../../../../common/common-bloks/common-attribute-set/attribute-blocks/attribute-color-swatch';
import { IAttribute } from '../../../../common-models';

class AttrColorPlp extends AttributeColorSwatch {
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
    return super.choiceHandle(item);
  }

  render() {
    const attr = this.props.attribute.items;
    return (
      <>
        <div className={stylesColor.colorBlock}>
          <h4>{`${this.props.attribute.name}:`}</h4>
          <div className={stylesColor.colorLine}>
            {attr.map((item) => {
              const color: string = item.value as string;
              const activeColor =
                item.id === this.state.activeAttributes.id
                  ? stylesColor.activeColor
                  : '';
              return (
                <div
                  onClick={() => this.choiceHandle(item)}
                  className={`${stylesColor.colorItem} ${activeColor}`}
                  key={item.id}
                >
                  <div
                    className={`${stylesColor.colorItemInside}`}
                    style={{ background: `${color}` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default AttrColorPlp;
