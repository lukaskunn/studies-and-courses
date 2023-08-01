from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth
from usuarios.forms import LoginForms, CadastroForms

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
                return redirect('index')
            else: 
                return redirect('login')
    
    return render(request, "usuarios/login.html", {"form": form})

def cadastro(request):
    form = CadastroForms()
    
    if request.method == 'POST': 
        form = CadastroForms(request.POST) 
               
        if form.is_valid():
            if form['senha_cadastro'].value() !=  form['confirmar_senha_cadastro'].value() or User.objects.filter(username=form['nome_cadastro'].value()).exists():
                return redirect('cadastro') 
            
            User.objects.create_user(
                username = form['nome_cadastro'].value(),
                email = form['email_cadastro'].value(),
                password = form['senha_cadastro'].value()
            ).save()
            
            return redirect('login')
            
            
    return render(request, "usuarios/cadastro.html", {"form": form})
