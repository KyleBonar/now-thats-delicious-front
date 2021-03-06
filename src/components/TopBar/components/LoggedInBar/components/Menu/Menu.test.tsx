import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import Menu, { MenuProps } from "./Menu";
import {
  casual,
  fakeStore,
  ITERATION_SIZE
} from "../../../../../../utils/testUtils/testUtils";
import { AppState } from "../../../../../../redux/configureStore";

describe("<Menu />", () => {
  let wrappers: any = [];
  // create stores
  const mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);
  const fakeMenuProps = (): MenuProps => ({
    className: casual.random_element([undefined, casual.string])
  });
  const mockMenus = new Array(ITERATION_SIZE).fill(null).map(fakeMenuProps);

  beforeAll(() => {
    // create wrappers
    mockStores.forEach((mockStore, ind) => {
      wrappers.push(
        enzyme.mount(
          <Provider store={mockStore}>
            <Menu {...mockMenus[ind]} />
          </Provider>
        )
      );
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("adds className to parent", () => {
    wrappers.forEach((wrapper, ind) => {
      // console.log(mockMenus[ind].className);
      expect(wrapper.find("div").first().prop("className")).toEqual(
        mockMenus[ind].className
      );
    });
  });

  it("renders Profile component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Profile").exists()).toBeTruthy();
    });
  });

  it("renders Account component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Account").exists()).toBeTruthy();
    });
  });

  it("renders Help component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Help").exists()).toBeTruthy();
    });
  });

  it("renders Admin component when possible", () => {
    wrappers.forEach((wrapper, ind) => {
      // grab isAdmin from store
      const reduxState = mockStores[ind].getState() as AppState;
      const isAdmin = reduxState.users.self?.isAdmin;
      if (!isAdmin) return;

      expect(wrapper.find("Admin").exists()).toBeTruthy();
    });
  });

  it("does not render Admin component when not admin", () => {
    wrappers.forEach((wrapper, ind) => {
      // grab isAdmin from store
      const reduxState = mockStores[ind].getState() as AppState;
      const isAdmin = reduxState.users.self?.isAdmin;
      if (isAdmin) return;

      expect(wrapper.find("Admin").exists()).toBeFalsy();
    });
  });
});
