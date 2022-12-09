import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';

const Footer = () => (
  <footer className="page-footer disable-text-selection">
    <div className="footer-content">
      <div className="container-fluid">
        <Row>
          <Colxx xxs="12" sm="6">
            <p className="mb-0 text-muted">
              Inventario @ Todos los Derechos Reservados
            </p>
          </Colxx>
        </Row>
      </div>
    </div>
  </footer>
);

export default Footer;
