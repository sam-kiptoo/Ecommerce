from django.shortcuts import render,get_object_or_404
from django.views.generic import ListView,DetailView
from django.http import Http404

# Create your views here.
from .models import Product

#class based view
class ProductListView(ListView):
    queryset = Product.objects.all()
    template_name = "product_app/product_list.html"
    #by default, the context is provided, where object_list contatins all the published obj
    #anyway to get context
    # def get_context_data(self, **kwargs):
    #     context = super(ProductListView,self).get_context_data(**kwargs)
    #     print(context)
    #     return context


def product_detailview(request,pk):
    # creating own model manager.
    instance = Product.objects.get_by_id(pk)
    if instance is None:
        raise Http404("Product doesn't Exists")

    return render(request,"product_app/product_detail.html",context={"object_list":instance})

#implementation of the above product_detailview based on class-view

# class ProductDetailView(DetailView):
#     template_name = "product_app/product_detail.html"

#     def get_object(self, *args, **kwargs):
#         request = self.request
#         pk = self.kwargs.get('pk')
#         instance = Product.objects.get_by_id(pk)
#         if instance is None:
#             raise Http404("Product doesn't Exists")
#         return instance 

class ProductFeaturedDetailView(DetailView):   
    template_name = "product_app/featured_product_detail.html" 

    def get_queryset(self,*args, **kwargs):
        pk = self.kwargs.get('pk')
        instance  = Product.objects.get_featured().filter(id=pk)
        # print(instance)
        if instance is None:
            raise Http404("No Products in Featured List")
        return instance       

    def get_context_data(self, **kwargs):
        context = super(ProductFeaturedDetailView,self).get_context_data(**kwargs)
        print(context)
        return context
          

class ProductFeaturedListView(ListView):
    template_name = "product_app/product_list.html"

    def get_queryset(self):
        instance  = Product.objects.get_featured()
        if instance is None:
            raise Http404("No Products in Featured List")
        return instance