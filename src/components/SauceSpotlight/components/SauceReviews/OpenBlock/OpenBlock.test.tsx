import * as React from "react";
import * as enzyme from "enzyme";

import OpenBlock, { IOpenBlock } from "./OpenBlock";

import {
  fakeReview,
  ITERATION_SIZE
} from "../../../../../utils/testUtils/testUtils";

const fakeSauceReviewBlocks = (): IOpenBlock => {
  return {
    review: fakeReview()
  };
};

describe("<OpenBlock />", () => {
  let wrappers: any = [];
  let props: IOpenBlock[] = [];

  beforeAll(() => {
    wrappers = new Array(ITERATION_SIZE).fill(null).map(() => {
      // Generate props
      const fakeProp = fakeSauceReviewBlocks();

      // Add props to collector
      props.push(fakeProp);

      return enzyme.shallow(<OpenBlock {...fakeProp} />);
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders a RatingBlock component for Aroma if Aroma is valid", () => {
    wrappers.forEach((wrapper, ind) => {
      // Grab aroma
      const {
        review: { aroma }
      } = props[ind];

      // Make sure aroma is legit
      if (!aroma) return;
      if (aroma.rating === 0 && aroma.txt.length === 0) return;

      // Find component
      expect(wrapper.find("RatingBlock[name='Aroma']").exists()).toBeTruthy();
    });
  });

  it("renders a RatingBlock component for Taste if Taste is valid", () => {
    wrappers.forEach((wrapper, ind) => {
      // Grab taste
      const {
        review: { taste }
      } = props[ind];

      // Make sure taste is legit
      if (!taste) return;
      if (taste.rating === 0 && taste.txt.length === 0) return;

      // Find component
      expect(wrapper.find("RatingBlock[name='Taste']").exists()).toBeTruthy();
    });
  });

  it("renders a RatingBlock component for Label if Label is valid", () => {
    wrappers.forEach((wrapper, ind) => {
      // Grab label
      const {
        review: { label }
      } = props[ind];

      // Make sure label is legit
      if (!label) return;
      if (label.rating === 0 && label.txt.length === 0) return;

      // Find component
      expect(wrapper.find("RatingBlock[name='Label']").exists()).toBeTruthy();
    });
  });
});
