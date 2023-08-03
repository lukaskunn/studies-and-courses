from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from apps.galeria.models import Fotografia

def index(request):
    if not request.user.is_authenticated:
        messages.error(request, "ususario nao esta logado")
        return redirect('login')
    
    fotografias = Fotografia.objects.order_by("data").filter(publicada=True)
    return render(request, 'apps.galeria/index.html', {"cards": fotografias})

def imagem(request, foto_id):
    fotografia = get_object_or_404(Fotografia, pk=foto_id)
    return render(request, 'apps.galeria/imagem.html', {"fotografia": fotografia})

def buscar(request):
    if not request.user.is_authenticated:
        messages.error(request, "ususario nao esta logado")
        return redirect('login')
    fotografias = Fotografia.objects.order_by("data").filter(publicada=True)
    
    if "buscar" in request.GET:
        nome_a_buscar = request.GET['buscar']
        if nome_a_buscar: 
            fotografias = fotografias.filter(nome__icontains=nome_a_buscar)
    
    return render(request, 'apps.galeria/buscar.html', {"cards": fotografias})