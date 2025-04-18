'use client'

import React, { useState } from 'react'
import BaseLayout from '@/components/layout/base-layout'
import { FAIXAS_OPTIONS } from '@/lib/constants'

export default function TurmasPage() {
  const [formData, setFormData] = useState({
    nome: '',
    professor: '',
    diasSemana: '',
    horario: '',
    faixaMinima: '',
    faixaMaxima: '',
    capacidade: '',
    descricao: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    try {
      const classData = {
        name: formData.nome,
        professor: formData.professor,
        daysOfWeek: formData.diasSemana,
        schedule: formData.horario,
        minBelt: formData.faixaMinima,
        maxBelt: formData.faixaMaxima,
        capacity: parseInt(formData.capacidade),
        description: formData.descricao,
        academyId: '1' // TODO: Pegar o ID da academia do contexto/estado global
      }
      
      const response = await fetch('http://localhost:3000/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
      })
      
      if (!response.ok) {
        throw new Error('Erro ao cadastrar turma')
      }
      
      const data = await response.json()
      console.log('Turma cadastrada com sucesso:', data)
      setMessage('Turma cadastrada com sucesso!')
      
      // Limpar o formulário
      setFormData({
        nome: '',
        professor: '',
        diasSemana: '',
        horario: '',
        faixaMinima: '',
        faixaMaxima: '',
        capacidade: '',
        descricao: ''
      })
    } catch (error) {
      console.error('Erro ao cadastrar turma:', error)
      setMessage('Erro ao cadastrar turma. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <BaseLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Cadastro de Turmas</h1>
        
        {message && (
          <div className={`p-4 mb-4 rounded-md ${message.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome da Turma
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
            <label htmlFor="professor" className="block text-sm font-medium text-gray-700">
              Professor
            </label>
            <input
              type="text"
              name="professor"
              id="professor"
              value={formData.professor}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="diasSemana" className="block text-sm font-medium text-gray-700">
              Dias da Semana
            </label>
            <input
              type="text"
              name="diasSemana"
              id="diasSemana"
              value={formData.diasSemana}
              onChange={handleChange}
              placeholder="Ex: Segunda e Quarta"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="horario" className="block text-sm font-medium text-gray-700">
              Horário
            </label>
            <input
              type="time"
              name="horario"
              id="horario"
              value={formData.horario}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="faixaMinima" className="block text-sm font-medium text-gray-700">
                Faixa Mínima
              </label>
              <select
                name="faixaMinima"
                id="faixaMinima"
                value={formData.faixaMinima}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Selecione a faixa mínima</option>
                {FAIXAS_OPTIONS.map(faixa => (
                  <option key={faixa.value} value={faixa.value}>
                    {faixa.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="faixaMaxima" className="block text-sm font-medium text-gray-700">
                Faixa Máxima
              </label>
              <select
                name="faixaMaxima"
                id="faixaMaxima"
                value={formData.faixaMaxima}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Selecione a faixa máxima</option>
                {FAIXAS_OPTIONS.map(faixa => (
                  <option key={faixa.value} value={faixa.value}>
                    {faixa.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="capacidade" className="block text-sm font-medium text-gray-700">
              Capacidade
            </label>
            <input
              type="number"
              name="capacidade"
              id="capacidade"
              value={formData.capacidade}
              onChange={handleChange}
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              name="descricao"
              id="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Cadastrando...' : 'Cadastrar Turma'}
            </button>
          </div>
        </form>
      </div>
    </BaseLayout>
  )
} 