/*Default Config*/

dw_Tooltip.defaultProps = {
    content_source: 'ajax',
    hoverable: true
};

dw_Tooltip.Ajax.reqURL = '/local/ajax/tips/getByXMLID.php';
dw_Tooltip.Ajax.waitMsg = 'Загрузка...';
dw_Tooltip.content_vars = {};

baseTooltip = {
  addTooltip: function (tooltipId, params){
      dw_Tooltip.content_vars['id_'+tooltipId] = { params: params };
      return true;
  },
  addTooltipsObject: function (tooltips){
      if(typeof tooltips != 'undefined' && tooltips.length > 0) {
          arTooltips = $.parseJSON(tooltips);
          for (var i in arTooltips){
              dw_Tooltip.content_vars['id_'+arTooltips[i].facetId] = {
                  params: { 'tablename': arTooltips[i].tableName, 'xmlid': arTooltips[i].xmlId }
              };
          }
      }
    }
};
