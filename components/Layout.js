import { Component } from "react";

export default class Layout extends Component {
  render() {
    return (
      <div className="flex flex-row flex-wrap min-h-screen">
        <nav className="w-full bg-[#211e1e] sm:w-1/3 md:w-1/12 px-1 text-white">
          <div className="sticky top-0 p-4 w-full">
            <ul className="flex flex-col overflow-hidden">test</ul>
          </div>
        </nav>
        <main
          role="main"
          className="w-full bg-[#141313] sm:w-2/3 md:w-11/12 px-12 py-4 text-white"
        >
            {this.props.children}
        </main>
      </div>
    );
  }
}
