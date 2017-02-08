/**
 * Created by Administrator on 2016/11/14.
 */
/*
*  1��unslider���÷����ķ�ʽ
*     var slider = $(".my-demo-slider").unslider();
*
*         //û�в����ķ�������
*         slider.data('unslider').methodName();
*
*         //���в����ķ�������
*         slider.data('unslider').methodName('arguments',argOne,argtwo);
*
*         //��ݵ��÷�ʽ
*         slider.unslider('methodName');
*         slider.unslider('methodName:arguments,go,here');
*   2������
 *     2.1��init(args) ��ʼ��slider
 *          ��һ�ε���unslider()���Զ�����init(0�����������ֲ������⣬�����������¼���sliderʱ�򣬿��Ե��ô˷�����
 *     2.2��calculateSlides()�������li�ĸ���
 *          ����ӻ�ɾ��liʱ����Ҫ���ô˷������¼���li�ĸ�����
 *     2.3��start() ��ʼ�ƶ�slider�����ݴ���Ĳ����������ʱ��
 *     2.4��stop() ֹͣslider���ƶ�������ֹ�Զ��ֲ�
 *     2.5��destroyKeys() �Ƴ���ݼ�����
 *     2.6��initKeys() �ֶ���ӿ�ݼ�֧�֡���destroyKeys()֮����ã����¼����ݼ�֧�֡�
 *          Ҳ�������ò��� { keys: false }֧�ֿ�ݼ�����
 *     2.7��setIndex(args) Ϊslider���õ�ǰ�����͵����������������ƶ�slider��
 *           �����Ҫ�ƶ���ָ����slider������ʹ��animate()������
 *           args: ����������������Ҳ��������Ӧ���ַ�������"last","first"�ȵ�
 *     2.8��animate(to,dir) �ƶ���ָ����slider������ָʾ����־������ unslider.change �¼���
 *          to: ���������ָ���ƶ�������
 *          dir����ѡ������ֵֻ��Ϊ'prev'��'next'��
 *     2.9��next() �ƶ�����һ��slider
 *     2.10��prev() �ƶ�����һ��slider
*  3������
*     3.2��dir = "rtl"
*          �����ֲ�ͼ���ֲ�������slider������������
*     3.3��autoplay: false �Զ��ֲ�
*     3.4��speed: 750 �ֲ��ٶ�
*     3.5��delay: 3000 ��ʼ�Զ��ֲ���Ҫ��ʱ��
*     3.6��index: 'first' ;ֵ��������������'first'��'last'������Ĭ�ֲ�����ʼλ��
*     3.7��keys: true; Ҳ��������Ϊ�����磺  keys: {
*                                                 prev: 37,
*                                                 next: 39,
*                                                 stop: 27
*                                              }
*     3.8��nav: true;  ��ӵ���ָʾ������Ҳ������ÿ��li������� data-nav="nav title"(nav title�����滻Ϊ����Ҫ����ʽ)��װ�����ָʾ����
*           �������Ҫ���Բ�㵼��ָʾ����ֻ��Ҫ����unslider-dots.css��
*           ��Ҳ�����ṩһ������������slider�ı�ǩ��ʽ
*           nav: function( index�� label){
*
*                if( index === 2 ){
*                   return label + 'third slide';
*                }
*
*                return index + 1;
*           }
*     3.9��arrows: true; ������Ҽ�ͷ��־�������Ϊ .unslider-arrow д�µ���ʽ������(����ѡ��ڶ��ַ�ʽ���ı����ϲ����html�ṹ����д����ʽ)
*          ֵ����Ϊtrue����false��������������һ������
*               arrows: {
*                  //  Unslider default behaviour
                    prev: '<a class="unslider-arrow prev">Previous slide</a>',
                    next: '<a class="unslider-arrow next">Next slide</a>',

                     //  Example: generate buttons to start/stop the slider autoplaying
                     stop: '<a class="unslider-pause" />',
                     start: '<a class="unslider-play">Play</a>'
*
*               }
*      3.10��animation: horizontal; ���ö����ķ���
*                       horizontal: ���������ƶ�
*                         vertical: ���ϵ����ƶ�
*                             fade: ���뵭��
*      3.11��selectors: ����㲻���õ������б���չʾ���slider������Ҫ��� selectors ����ָ��unslider��Ԫ�����ĸ���
*            selectors: {
*                   container: "ul:first",
*                   slides: "li"
*            }
*            ���Բ鿴unslider.lessԴ�ļ��Զ���slider����Ҫ����ʽ���
*      3.12��animateHeight: false; unslider�����Ƿ�Ҫ��Ӧli�ĸ߶�
*      3.13��activeClass: 'unslider-active' ;���õ�ǰslide�������ʽ
*      3.14��infinite: true; �޷����
*  4���¼�
*     slider.on("unslider.ready",function(){
*
*     });
*     //  Listen to slide changes
     slider.on('unslider.change', function(event, index, slide) {
                alert('Slide has been changed to ' + index);
     });
*
*
*
* */
/*
*  $obj: ��Ҫ�ֲ��Ķ���
*  options: �������󡣲�����������ԡ�
* */
var HLJslider = {
     slider: function($obj , options) {
         var defaultObj = {
             autoplay: false,
             nav: true,
             arrows: true,
             activeClass: "hlj-active",
             infinite: true
         };
         $.extend(defaultObj,options);

         return $obj.unslider(defaultObj);

     },

};

