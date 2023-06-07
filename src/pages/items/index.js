import React, { Component } from "react";

export default class index extends Component {
  render() {
    return (
      <>
        {/* phần header */}
        <div className="lg:h-[100px] border "></div>

        {/* phần thân */}
        {/* thẻ to */}
        <div className="mx-auto lg:mt-[100px] border w-[90%] lg:h-[400px]"></div>

        {/* phần thân */}
        <div className="mx-auto lg:mt-[100px] border w-[90%] lg:h-[1200px] lg:grid lg:grid-cols-9">
          <div className="lg:mr-[30px] lg:col-span-7 lg:border"></div>
          <div className="lg:col-span-2 lg:border"></div>
        </div>
      </>
    );
  }
}
