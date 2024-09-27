/*
 * :file description:
 * :name: /sungent/src/components/ECharts/index.tsx
 * :author: 张德志
 * :copyright: (c) 2021, Tungee
 * :date created: 2021-12-27 16:40:48
 * :last editor: 张德志
 * :date last edited: 2024-05-22 17:09:51
 */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/funnel';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/tooltip';
import elementResizeEvent from 'element-resize-event';
import { Component } from 'react';
import type { EchartProps } from './types';

export default class ReactEcharts extends Component<EchartProps, any> {
  echartsInstance: any;

  echartsElement: any;

  firstRenderEnd: any;

  constructor(props: EchartProps) {
    super(props);
    this.echartsInstance = this.props.echarts; // the echarts object.
    this.echartsElement = null; // echarts div element
  }

  // first add
  componentDidMount() {
    const echartObj = this.renderEchartDom();
    this.echartsInstance = echartObj;
    const onEvents = this.props.onEvents || {};

    this.bindEvents(echartObj, onEvents);
    // on chart ready
    if (typeof this.props.onChartReady === 'function')
      this.props.onChartReady(echartObj);

    const { canResize = true } = this.props;
    // on resize
    elementResizeEvent(this.echartsElement, () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      canResize && echartObj?.resize();
    });
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      canResize && echartObj.resize();
    });
  }

  shouldComponentUpdate(nextProps: EchartProps) {
    const now = new Date().getTime();
    if (this.firstRenderEnd && now > this.firstRenderEnd) {
      return true;
    }
    if (
      JSON.stringify(nextProps.option) !== JSON.stringify(this.props.option)
    ) {
      return true;
    }
    return false;
  }

  // update
  componentDidUpdate() {
    this.renderEchartDom();
    this.bindEvents(this.getEchartsInstance(), this.props.onEvents || []);
  }
  // return the echart object
  getEchartsInstance = () => {
    return (
      (this.echartsInstance &&
        this.echartsInstance.hasOwnProperty('getInstanceByDom') &&
        this.echartsInstance.getInstanceByDom(this.echartsElement)) ||
      echarts.init(this.echartsElement, this.props.theme)
    );
  };

  // bind the events
  bindEvents = (instance: any, events: any) => {
    const loopEvent = (eventName: any) => {
      // ignore the event config which not satisfy
      if (
        typeof eventName === 'string' &&
        typeof events[eventName] === 'function'
      ) {
        // binding event
        instance.off(eventName);
        instance.on(eventName, (param: any) => {
          events[eventName](param, instance);
        });
      }
    };

    Object.keys(events).forEach((eventName) => {
      if (Object.prototype.hasOwnProperty.call(events, eventName)) {
        loopEvent(eventName);
      }
    });
  };

  // render the dom
  renderEchartDom = () => {
    // init the echart object
    const echartObj = this.getEchartsInstance();
    if (!this.props.notReady) {
      // 1000 ms for chart animation
      this.firstRenderEnd = new Date().getTime() + 1000;
      // set the echart option
      echartObj.setOption(
        this.props?.option,
        this.props?.notMerge || false,
        this.props?.lazyUpdate || false,
      );
    }
    // set loading mask
    if (this.props.showLoading)
      echartObj.showLoading(this.props.loadingOption || null);
    else echartObj.hideLoading();

    return echartObj;
  };

  render() {
    const style = this.props.style || {
      height: '180px',
    };
    // for render
    return (
      <div
        ref={(e) => {
          this.echartsElement = e;
        }}
        style={{ ...style, minHeight: 230 }}
        className={this.props.className}
      />
    );
  }
}
