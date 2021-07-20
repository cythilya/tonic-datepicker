import PropTypes from 'prop-types';
import {
  Button,
  Flex,
  Icon,
} from "@trendmicro/react-styled-ui";
import { MONTH } from './constants';

const Controller = ({
  chageRenderDate,
  renderDate,
}) => (
  <Flex justify="space-between" mb="3x">
    <Button
      variant="ghost"
      type="button"
      aria-label="previous"
      onClick={() => chageRenderDate(-1)}
    >
      <Icon icon="angle-left" />
    </Button>
    <Button variant="ghost" type="button" aria-label="change mode">
      {MONTH[renderDate.month]} {renderDate.year}
    </Button>
    <Button
      variant="ghost"
      type="button"
      onClick={() => chageRenderDate(1)}
    >
      <Icon icon="angle-right" />
    </Button>
  </Flex>
);

Controller.propTypes = {
  chageRenderDate: PropTypes.func.isRequired,
  renderDate: PropTypes.object.isRequired,
};

export default Controller;
