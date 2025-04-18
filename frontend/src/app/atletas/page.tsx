'use client'

import React, { useState, useEffect } from 'react'
import BaseLayout from '@/components/layout/base-layout'
import { FAIXAS_OPTIONS } from '@/lib/constants'

export default function AtletasPage() {
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    telefone: '',
    endereco: '',
    faixa: '',
    zempo: '',
    fotoPerfil: null as File | null,
    documentos: [] as File[],
    fotos: [] as File[],
    observacoes: ''
  })
  
  const [academyId, setAcademyId] = useState('')
  const [unitId, setUnitId] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Buscar o ID da academia
    const fetchAcademy = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/academies')
        const data = await response.json()
        if (data && data.length > 0) {
          setAcademyId(data[0].id)
          
          // Buscar unidades da academia
          const unitResponse = await fetch(`http://localhost:3000/api/academies/${data[0].id}/units`)
          const unitData = await unitResponse.json()
          if (unitData && unitData.length > 0) {
            setUnitId(unitData[0].id)
          }
        }
      } catch (error) {
        console.error('Erro ao buscar academia:', error)
      }
    }
    
    fetchAcademy()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    try {
      // Criar o aluno
      const studentData = {
        name: formData.nome,
        email: `${formData.nome.toLowerCase().replace(/\s+/g, '.')}@example.com`, // Email temporário
        phone: formData.telefone,
        birthDate: formData.dataNascimento,
        academyId: academyId,
        unitId: unitId,
      }
      
      const response = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      })
      
      if (!response.ok) {
        throw new Error('Erro ao cadastrar aluno')
      }
      
      const data = await response.json()
      console.log('Aluno cadastrado com sucesso:', data)
      setMessage('Aluno cadastrado com sucesso!')
      
      // Limpar o formulário
      setFormData({
        nome: '',
        dataNascimento: '',
        telefone: '',
        endereco: '',
        faixa: '',
        zempo: '',
        fotoPerfil: null,
        documentos: [],
        fotos: [],
        observacoes: ''
      })
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error)
      setMessage('Erro ao cadastrar aluno. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'documentos' | 'fotos') => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        [field]: Array.from(e.target.files || [])
      }))
    }
  }

  const handleFotoPerfilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        fotoPerfil: e.target.files![0]
      }))
    }
  }

  return (
    <BaseLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Cadastro de Atletas</h1>
        
        {message && (
          <div className={`p-4 mb-4 rounded-md ${message.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={formData.nome}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">
              Data de Nascimento
            </label>
            <input
              type="date"
              name="dataNascimento"
              id="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="tel"
              name="telefone"
              id="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
              Endereço
            </label>
            <input
              type="text"
              name="endereco"
              id="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="faixa" className="block text-sm font-medium text-gray-700">
              Faixa
            </label>
            <select
              name="faixa"
              id="faixa"
              value={formData.faixa}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Selecione uma faixa</option>
              {FAIXAS_OPTIONS.map(faixa => (
                <option key={faixa.value} value={faixa.value}>
                  {faixa.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="zempo" className="block text-sm font-medium text-gray-700">
              Zempo
            </label>
            <input
              type="text"
              name="zempo"
              id="zempo"
              value={formData.zempo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="fotoPerfil" className="block text-sm font-medium text-gray-700">
              Foto de Perfil
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <div className="flex-shrink-0">
                {formData.fotoPerfil ? (
                  <img
                    src={URL.createObjectURL(formData.fotoPerfil)}
                    alt="Preview"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <input
                type="file"
                name="fotoPerfil"
                id="fotoPerfil"
                accept="image/*"
                onChange={handleFotoPerfilChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Foto do rosto do aluno para identificação
            </p>
          </div>

          <div>
            <label htmlFor="documentos" className="block text-sm font-medium text-gray-700">
              Documentos
            </label>
            <input
              type="file"
              name="documentos"
              id="documentos"
              multiple
              onChange={(e) => handleFileChange(e, 'documentos')}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.documentos.length} arquivo(s) selecionado(s)
            </p>
          </div>

          <div>
            <label htmlFor="fotos" className="block text-sm font-medium text-gray-700">
              Outras Fotos
            </label>
            <input
              type="file"
              name="fotos"
              id="fotos"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'fotos')}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.fotos.length} arquivo(s) selecionado(s)
            </p>
          </div>

          <div>
            <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700">
              Observações
            </label>
            <textarea
              name="observacoes"
              id="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !academyId || !unitId}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Cadastrando...' : 'Cadastrar Atleta'}
            </button>
          </div>
        </form>
      </div>
    </BaseLayout>
  )
} 