'use strict';
   angular
        .module('starter').constant('appConstants', {
        mode:'prd',
        prog_id: 37,
        url_dev:'/app/data-json/',
        url_prd:'http://admin.wariyum.com/service/',
        url_stg:'http://admin.wariyum.com/service/',
        url_dev_img:'http://admin.wariyum.com/images/',
        url_prd_img:'http://admin.wariyum.com/images/',
        url_stg_img:'http://admin.wariyum.com/images/',
        //sample programs
        prog_id_furniture:39,
        prog_id_supermarket:37,
        prog_id_jewellery:38
    });