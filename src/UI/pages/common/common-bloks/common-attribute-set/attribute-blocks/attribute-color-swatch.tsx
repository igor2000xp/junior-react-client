import React, { Component } from 'react';
import stylesColor from './attribute-color-swatch.module.css';
import {
  activeAttributesInit,
  IAttribute,
  IAttributeColorSwatchState,
  IProductAttribute,
} from '../../../../common-models';

export type IProps = Readonly<IAttributeColorSwatchProps>;
type IState = Readonly<IAttributeColorSwatchState>;

export interface IAttributeColorSwatchProps {
  attribute: IProductAttribute;
  activeAttributeInRow?: string;
  getAttrState: (value: IAttributeColorSwatchState) => void;
}

class AttributeColorSwatch extends Component<IProps, IState> {
  private readonly locationPage: string;
  constructor(props: IProps) {
    super(props);
    this.choiceHandle = this.choiceHandle.bind(this);
    this.locationPage = window.location.pathname.split(':')[1];
    this.state = {
      productId: this.locationPage,
      activeAttributes: activeAttributesInit,
    };
  }

  async componentDidMount() {
    await this.setFirstAttrActive();
    this.props.getAttrState(this.state);
  }

  async setFirstAttrActive() {
    await this.setState(() => {
      return {
        activeAttributes: {
          id: this.props.attribute.items[0].id,
          value: this.props.attribute.items[0].value,
          attrID: this.props.attribute.id,
        },
      };
    });
  }
  async choiceHandle(item: IAttribute) {
    await this.setState(() => {
      return {
        productId: this.locationPage,
        activeAttributes: {
          id: item.id,
          value: item.value,
          attrID: this.props.attribute.id,
        },
      };
    });
    this.props.getAttrState(this.state);
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

export default AttributeColorSwatch;
