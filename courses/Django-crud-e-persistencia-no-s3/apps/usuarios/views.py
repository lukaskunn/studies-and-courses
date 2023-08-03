from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth, messages
from apps.usuarios.forms import LoginForms, CadastroForms

def login(request):
    form = LoginForms()
    
    if request.method == 'POST': 
        form = LoginForms(request.POST) 
               
        if form.is_valid():
            usuario = auth.authenticate(
                request,
                username=form['nome_login'].value(),
                password=form['senha_login'].value()
            )
            if usuario is not None:
                auth.login(request, usuario)
                messages.success(request, f"{form['nome_login'].value()} Logado com sucesso")
                return redirect('index')
            else: 
                messages.error(request, "Erro ao efetuar Login")
                return redirect('login')
    
    return render(request, "usuarios/login.html", {"form": form})

def cadastro(request):
    form = CadastroForms()
    
    if request.method == 'POST': 
        form = CadastroForms(request.POST) 
               
        if form.is_valid():
            if User.objects.filter(username=form['nome_cadastro'].value()).exists():
                messages.error(request, "Usuario ja cadastrado com esse nome")
                return redirect('cadastro') 
            
            User.objects.create_user(
                username = form['nome_cadastro'].value(),
                email = form['email_cadastro'].value(),
                password = form['senha_cadastro'].value()
            ).save()
            
            messages.success(request, "Usuario cadastrado com sucesso")
            return redirect('login')
            
            
    return render(request, "usuarios/cadastro.html", {"form": form})


def logout(request):
    auth.logout(request)
    messages.success(request, "Logout efetuado com sucesso")
    return redirect("login")