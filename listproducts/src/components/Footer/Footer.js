import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="copyright">
        © 2020 Copyright: Luiz Otávio Bione Moraes
      </div>
      <div className="redes-sociais">
        <a class="text-white icone" href="https://github.com/luizotaviobione">
          <i class="icon-margin fab fa-github-square fa-2x"></i>
        </a>
        <a class="text-white icone" href="">
          <i class="icon-margin fab fa-twitter-square fa-2x"></i>
        </a>
        <a class="text-white icone" href="https://www.facebook.com/luiz.bione">
          <i class="icon-margin fab fa-facebook-square fa-2x"></i>
        </a>
      </div>
    </div>
  );
}

export default Footer;
